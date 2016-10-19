# Running

## Dev setup of rx-jupyter

From a dev setup of `rx-jupyter` run:

```
npm link
```

## Notebook server that allows access to our React app (and other localhost servers)

```
jupyter notebook --NotebookApp.allow_origin_pat='^https?://127.0.0.1:.*'
```

## Now for this repo

Clone this repo then

```
npm i
npm link rx-jupyter
npm start
```


