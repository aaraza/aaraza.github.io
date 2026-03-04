+++
date = '2026-03-03T22:00:00-00:00'
draft = false
title = "Double Check Locking for Thread-Safe Singleton Initialization"
+++

## Naive Singleton Initialization

Consider a scenario where multiple threads rely on a common singleton with non-deterministic invocation order. The naive approach for creating singletons looks like this:

```java
class Utility {

    private static Utility instance;

    @Getter
    private Map<String, String> utilityMap;

    private Utility() {
        utilityMap = new HashMap<>();
    }

    private static void initialize() {
        if (instance == null) {
            instance = new Utility();
        }
    }

    public static Utility getInstance() {
        if (instance == null) {
            initialize();
        }
        return instance;
    }

}
```

## Issues in Concurrent Programs 

Let's assume:

1. `initialize()` takes ~250ms to run.
2. Our program has two threads that both rely on `utilityMap`.

When Thread A calls `getInstance()`, the check for `instance == null` will be true. Thread A will call `initialize()`. If thread B calls `getInstance()` 50ms after thread A called `getInstance()`, the check for `instance == null` will still be true, and Thread B will also call `initialize()`.

Imagine that at 275ms into the program's execution, thread A modifies the `utilityMap` by adding a new key/value pair into it. 300ms into the program's execution, thread B's call to `initialize()` will finish, and the static singleton field `instance` will be overwritten. Critically, the `utilityMap` modifications done by thread A just 25ms before are lost forever.

{{< inline-svg src="post-photos/double-check-locking-race-condition.svg" >}}

## Double Checked Locking Initialization

We can solve this problem using the **double-checked locking** design pattern:

```java
class Utility {

    private static volatile Utility instance;

    @Getter
    private Map<String, String> utilityMap;

    private Utility() {
        utilityMap = new HashMap<>();
    }

    public static void initialize() {
        if (instance == null) {
            synchronized (Utility.class) {
                if (instance == null) {
                    instance = new Utility();
                }
            }
        }
    }

    public static Utility getInstance() {
        if (instance == null) {
            initialize();
        }
        return instance;
    }

}
```

The key changes are:
1. The `volatile` keyword has been added to the `instance` field.
2. The `initialize` method has been modified to add an additional null check along with a lock on the `Utility` class. 

The first null check outside the synchronized block is in place because once the singleton is initialized, all subsequent calls to initialize will return immediately without touching the lock.

The synchronized keyword acquires a lock on the class object, only allowing one thread to enter the block at a time. The other threads need to wait till the first thread's execution of the synchronized block is complete.

Once the first thread has completed its execution of the synchronized block, the second null check shall return false, preventing any other threads that are waiting for the class' lock to be released from re-initializing the class.

However, this pattern does not work as is without the volatile keyword because when a new instance of an object is created, the JVM:
1. Allocates memory for the object
2. Populates the class' fields
3. Assigns a reference to instance

Without volatile, the JVM can reorder 2 and 3. Thread A could assign a reference before the constructor finishes. Thread B sees the instance is not null and skips the synchronized block. Subsequently, it could read from the map that hasn't yet been initialized.

Volatile guarantees that by the time a reference is assigned and visible to other threads, all the fields have been initialized.

{{< inline-svg src="post-photos/double-check-locking-solved.svg" >}}

## Recommended Readings
1. [Double-Checked Locking - An Optimization Pattern for Efficiently Initializing and Accessing Thread-safe Objects](https://www.dre.vanderbilt.edu/~schmidt/PDF/DC-Locking.pdf): This paper introduced the double-check locking pattern.
2. [The "Double-Checked Locking is Broken" Declaration](https://www.cs.umd.edu/~pugh/java/memoryModel/DoubleCheckedLocking.html): Highlights issues with the original paper as well as how those were fixed in JDK 5 (with the introduction of the `volatile` keyword). 