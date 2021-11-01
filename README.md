
## Build
```tsc -t es2020 -m es2020 ./run.ts --outDir build/js```

## Run
```http://x.x.x.x/sorts/build/```  

<img src="blob/s1.jpg" />

## How to add new sorter
Create new generator in ```sorters.ts```, then add it to ```sorters``` array in ```run.ts```