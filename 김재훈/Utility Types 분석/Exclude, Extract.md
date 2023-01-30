### 개념

```
// Exclude
type Animal = 'Cat' | 'Dog' | 'Human';

type Mammal = Exclude<Animal, 'Human'>;          // 'Cat' | 'Dog'
type Human = Extract<Animal, 'Cat' | 'Dog'>;     // 'Cat' | 'Dog'

```

### 직접 구현
```
type Exclude<T, U> = T extends U ? never : T; 

type Extract<T, U> = T extends U ? T : never;

 ```
 
Exclude를 위의 예시에 대입해보면   
 'Cat' extends 'Human'     // false  -> T  
 'Dog' extends 'Human'     // false  -> T  
 'Human' extends 'Human'   // true   -> never  
 따라서 결과값은 'Cat' | 'Dog'  
 
 
 Extract를 위의 예시에 대입해보면  
 'Cat' extends 'Cat' | 'Dog'      // true   -> T  
 'Dog' extends 'Cat' | 'Dog'      // true   -> T  
 'Human' extends 'Cat' | 'Dog'    // false  -> never  
 따라서 결과값은 'Cat' | 'Dog'
