# TSconfig의 다양한 옵션들

[https://aka.ms/tsconfig](https://aka.ms/tsconfig)

tsconfig.json 파일 상단의 링크를 클릭하면 더 많은 설명이 있다.

---

**incremental**

이전 컴파일된 파일과 비교, 수정 사항이 없다면 그 부분을 유지하고 수정된 내용만 컴파일함.

true 이면 컴파일 시간이 빨라진다

이전 컴파일 정보를 디스크에 보관해서 PC에 저장하는 용량이 늘어날 수 있다

**composite**

incremental과 함께 사용

이전 빌드 정보를 기억하고 있어서 다음 빌드 시 더 빠르게 빌드가 가능

**tsBuildInfoFile**

위에서 설정한 incremental가 true이면 관련 정보들을 담을 수 있는 파일을 지정

**target**

어떤 버전으로 컴파일 할 건지 선택

낮은 버전일 수록 동일한 기능을 이용하기 위해 복잡한 코드가 만들어짐. 필요한 버전까지만 설정해서 사용하기, 일반적으로 ES5, ES6 사용

타겟이 ES5인 경우 타입스크립트 코드에서 ECMAScript에서 기본 제공하는 document. 정보를 얻을 수 있고 querySelector도 사용 가능

**lib**

세부적인 라이브러리 선택 가능, 보통은 따로 설정하지 않고 target에서 따라 나오는 것을 선택한다.

**jsx**

리액트에서 사용하는 jsx.

리액트에 관련된 것을 사용할 건지 설정

**module**

컴파일 될 때 모듈 정보를 어떻게 할 건지 결정

node project는 CommonJS로, 브라우저 환경이면 ECMAScript 표준에 맞는 것을 선택

**rootDir**

rootDir 내부의 파일만 컴파일러 설정 가능

**allowJs**

프로젝트 안에서 js 파일을 같이 쓸 건지, 프로젝트에 js + ts를 같이 쓸 건지 선택

**checkJs**

자바스크립트 파일에서 잘못하고 있다면 경고 문구가 뜨도록 설정

한 프로젝트 내에서 js + ts 함께 쓰고 있다면

_allowJs와 checkJs를 true로 설정하는 것이 좋다_

**declaration**

타입 정의에 관련된 설정, 일반 제품 프로젝트에선 true로 하지 않는다. 생성된 코드를 라이브러리 형식으로 제공할 것이 아니라면 설정하지 않음

**sourceMap**

디버깅시 유용. 이후 강의에서 설명

**outFile**

다수의 ts 파일을 하나의 js 파일로 만들 때 사용

**outDir**

출력 디렉토리 설정

**removeComments**

코멘트를 없앤다

**noEmit**

컴파일 에러 체크만 하고, 실제 js 코드로 변환하지 않는다

**importHelpers와 downlevelIteration**

타입스크립트 코드를 구버전 js 코드로 변환할 때 문제될 수 있는 부분을 안전하게 동작할 수 있도록 도와줌

iterable한 for of 루프에서 문제점이 있을 때 해당 옵션 살펴보기

**isolatedModules**

각각의 파일을 다른 모듈로 변환해서 만듦

**Strict Type-Checking Options의 strict**는

엄격한 확인을 받을 수 있게 true로 두고 사용한다.

---

### 주로 사용되는, TypeScript 4.4 버전 기준 tsconfig 옵션

1. **`incremental`**: incremental 컴파일 기능을 사용하도록 설정합니다. 이 기능은 이전에 컴파일된 코드를 캐시하여 다음 번 컴파일 시간을 단축시킵니다.
2. **`tsBuildInfoFile`**: incremental 컴파일 시에 생성된 정보를 저장하는 파일의 경로를 설정합니다.
3. **`composite`**: 프로젝트가 컴파일될 때 연결된 프로젝트의 종속성 관계를 파악하여 효율적인 컴파일을 지원합니다.
4. **`declarationMap`**: d.ts 파일과 소스 맵 파일을 생성하도록 설정합니다.
5. **`diagnostics`**: 컴파일 시 발생하는 경고나 오류 메시지를 제어하는 옵션으로, strict 모드와 함께 사용됩니다.
6. **`esModuleInterop`**: CommonJS 모듈 형식에서 ES6 모듈 형식으로 변환할 때, `import * as foo from "foo"`와 같은 문법을 `import foo from "foo"`로 사용할 수 있도록 합니다.
7. **`skipLibCheck`**: 타입 체크를 수행하지 않도록 설정합니다. 보통 라이브러리 코드를 컴파일할 때 사용합니다.
8. **`forceConsistentCasingInFileNames`**: 파일 이름에서 대소문자 구분을 강제하도록 설정합니다.
9. **`strict`**: TypeScript에서 제공하는 모든 엄격한 타입 검사 옵션을 활성화합니다. 이 옵션은 **`noImplicitAny`**, **`strictNullChecks`**, **`noImplicitThis`**, **`alwaysStrict`**, **`strictFunctionTypes`**, **`strictPropertyInitialization`**, **`noUnusedLocals`**, **`noUnusedParameters`**, **`noImplicitReturns`**, **`noFallthroughCasesInSwitch`** 를 포함합니다.
10. **`target`**: ECMAScript 목표 버전을 선택합니다. 현재 기준으로는 **`ES2022`**, **`ES2021`**, **`ES2020`**, **`ES2019`**, **`ES2018`**, **`ES2017`**, **`ES2016`**, **`ES2015`**, **`ES5`** 를 선택할 수 있습니다.
11. **`module`**: TypeScript에서 지원하는 모듈 형식을 선택합니다. **`CommonJS`**, **`AMD`**, **`System`**, **`UMD`**, **`ES2015`**, **`ES2020`**, **`ESNext`**를 선택할 수 있습니다.
12. **`outDir`**: 컴파일된 파일의 출력 경로를 설정합니다.
13. **`rootDir`**: 컴파일할 소스 파일의 경로를 설정합니다.
14. **`sourceMap`**: 소스 맵 파일을 생성하도록 설정합니다.
15. **`typeRoots`**: TypeScript 타입 정의 파일(d.ts)을 검색할 경로를 설정합니다.
16. **`lib`**: 프로젝트에서 사용할 라이브러리를 설정합니다. **`ES5`**, **`ES6`**, **`ES7`**, **`ES2015`**, **`ES2016`**, **`ES2017`**, **`ES2018`**, **`ES2019`**, **`ES2020`**, **`ES2021`**, **`ES2022`**, **`DOM`**, **`DOM.Iterable`**, **`WebWorker`**, **`ScriptHost`**, **`ESNext`** 를 선택할 수 있습니다. 이 옵션은 특정 환경에서 동작하는 코드를 작성할 때 사용됩니다.
17. **`paths`**: 모듈 이름을 파일 경로에 매핑하는 규칙을 설정합니다. 예를 들어, **`@components/*`** 패턴을 **`src/components/*`** 경로와 매핑할 수 있습니다.
18. **`baseUrl`**: **`paths`** 옵션에서 사용할 기본 경로를 설정합니다.
19. **`allowSyntheticDefaultImports`**: CommonJS 모듈 형식에서 **`import foo from "foo"`** 와 같은 문법을 사용할 수 있도록 합니다.
20. **`allowJs`**: JavaScript 파일도 컴파일 대상에 포함시킵니다.
21. **`checkJs`**: JavaScript 파일도 타입 체크 대상에 포함시킵니다.
22. **`downlevelIteration`**: ES6 이터레이터를 ES5에서 동작할 수 있도록 변환합니다.
23. **`emitDecoratorMetadata`**: 데코레이터에 대한 메타데이터를 생성하도록 합니다.
24. **`experimentalDecorators`**: 실험적인 데코레이터 기능을 사용하도록 합니다.
25. **`noEmitOnError`**: 컴파일 에러가 발생하면 파일을 생성하지 않도록 합니다.
26. **`noEmit`**: 컴파일된 파일을 생성하지 않도록 합니다.
27. **`noImplicitAny`**: any 타입을 명시하지 않으면 컴파일 에러를 발생시킵니다.
28. **`noImplicitThis`**: this 타입이 명시되지 않으면 컴파일 에러를 발생시킵니다.
29. **`noUnusedLocals`**: 사용하지 않는 지역 변수가 있으면 컴파일 에러를 발생시킵니다.
30. **`noUnusedParameters`**: 사용하지 않는 함수 인자가 있으면 컴파일 에러를 발생시킵니다.
31. **`preserveConstEnums`**: const 열거형 멤버를 보존하도록 합니다.
32. **`removeComments`**: 주석을 제거하도록 합니다.
33. **`skipDefaultLibCheck`**: 기본 타입 정의 파일을 검사하지 않도록 합니다.
34. **`sourceRoot`**: 소스 파일의 루트 경로를 설정합니다.
35. **`strictBindCallApply`**: bind, call, apply 함수 호출 시 인자 타입 검사를 수행하도록 합니다.
36. **`strictNullChecks`**: null 및 undefined를 명시적으로 처리하지 않으면 컴파일 에러를 발생시킵니다.
37. **`strictNullChecks`**: **`null`** 과 **`undefined`** 가 포함된 값의 사용을 강제하도록 합니다.
38. **`strictPropertyInitialization`**: 클래스의 프로퍼티 초기화를 강제하도록 합니다.
39. **`esModuleInterop`**: CommonJS 모듈 형식에서 **`import foo from "foo"`** 와 같은 문법을 사용할 수 있도록 합니다.
40. **`forceConsistentCasingInFileNames`**: 파일 이름의 대소문자 표기법을 통일하도록 합니다.
41. **`moduleResolution`**: 모듈 해석 방식을 설정합니다. **`Node`** 나 **`Classic`** 을 선택할 수 있습니다.
42. **`resolveJsonModule`**: **`.json`** 파일을 모듈처럼 사용할 수 있도록 합니다.
43. **`isolatedModules`**: 파일별로 컴파일하도록 합니다. 이 옵션을 사용하면 컴파일러가 여러 파일을 단일 파일로 결합하지 않습니다.
44. **`incremental`**: 증분 컴파일 기능을 사용하도록 합니다.
45. **`tsBuildInfoFile`**: 증분 컴파일 정보를 저장할 파일 경로를 설정합니다.
46. **`composite`**: 프로젝트를 컴포지트 프로젝트로 설정합니다.
47. **`declarationDir`**: **`.d.ts`** 파일을 저장할 경로를 설정합니다.
48. **`declarationMap`**: **`.d.ts.map`** 파일을 생성하도록 합니다.
49. **`noImplicitReturns`**: 함수에서 모든 코드 경로에서 값을 반환하지 않으면 컴파일 에러를 발생시킵니다.
50. **`noFallthroughCasesInSwitch`**: switch 문에서 **break**가 빠지면 컴파일 에러를 발생시킵니다.
