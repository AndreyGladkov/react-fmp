# react-fmp
React component measures time the first meaningful paint. 
First Meaningful Paint is the time it takes for a page's primary content to appear on the screen.

##Props
* labelSSR - type `string`
* labelClient - type `string`
* serverENV - type `boolean` Server environment flag.
* send - type `function` Metrics send function. 
    Argument - metric object:
    ```js
    {
        renderTreeFormed - milliseconds,
        fmp - milliseconds,
        label - metric label
    }
    ```



#### Example
```js
<ReactFMP
    labelSSR="labelSSR"
    labelClient="labelClient"
    serverENV={false}
    send={send}>
    <p>Primary content</p>
</ReactFMP>
```
