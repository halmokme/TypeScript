```
데이터들의 타입이 전부 any라 문제가 있는 상황
(async() => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        console.log(response.data);
        console.log(response.data.userId);
        console.log(response.data.id);
        console.log(response.data.title);
        console.log(response.data.body);
    }
    catch {}
})();
```
```
axios 선언을 보고 타이핑을 해주되, 길어지면 보기 안좋으므로 따로 뺀다.
get요청과 post요청의 타이핑이 다른 이유 기억하기.

interface Post {userId: number, id: number, title: string, body: string }

(async() => {
    try {
        const response = await axios.get<Post>('https://jsonplaceholder.typicode.com/posts/1');
        const response2 = await axios.post('https://jsonplaceholder.typicode.com/posts/1', {
            title: 'foo',
            body: 'bar',
            userId: 1,
        })
        console.log(response.data);
        console.log(response.data.userId);
        console.log(response.data.id);
        console.log(response.data.title);
        console.log(response.data.body);
    }
    catch {}
})();
```
```
기본적으로 catch문의 에러는 unknown. 사실 이게 맞는게 많이 하는 착각 중에 하나가 try문안에 axios코드만 있으니까 에러도 axios 에러만 날거라고 생각하는데 
try문에서 문법 에러가 날 수도 있다. 그럼 catch문에도 문법 에러가 캐치되고 결국 어떤 에러가 날지 에러가 나기 전에는 모르므로 unknown이 맞다

response가 없을 수도 있으므로 항상 ?붙이기. 정의된 부분에서도 옵셔널로 되어있다.


(async() => {
    try {
    }
    catch (error) {
        // 타입가드. axios에러가 클래스로 만들어졌으므로 가능(interface면 타입가드 못씀)
        if(error instanceof AxiosError){
            console.error(error.response?.data);
            error.response?.data;
        }
        // 찾아보면 isAxiosError라는 것도 있음
        if(axios.isAxiosError(error)) {}
})();
```


```
{ message: '서버 장애입니다. 다시 시도해주세요' } 이런 에러메세지가 에러응답의 데이터에 들어있을 수 있음.
data의 타입이 unknown이니까 타이핑을 해주면 된다
(async() => {
    try {
    }
    catch (error) {
        if(axios.isAxiosError(error)){
            console.error(error.response?.data.message);
            console.error((error.response as AxiosResponse<{message: string}>)?.data.message);
        }
})();
```
