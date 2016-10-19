# Running

## Dev setup of rx-jupyter

From a dev setup of `rx-jupyter` run:

```
npm link
```

## Notebook server that allows access to our React app

```
jupyter notebook --NotebookApp.allow_origin='http://127.0.0.1:3000'
```

## Now for this repo

Clone this repo then

```
npm i
npm link rx-jupyter
npm start
```


