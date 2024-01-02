## Descripción
aplicación en [Next.js](https://nextjs.org/)  que depende de la api-bff del repo:


https://github.com/arcoslwm/mel-bff

## requisitos:
- clonar proyecto [mel-bff](https://github.com/arcoslwm/mel-bff) y seguir instrucciones del README 

## Instalación

- crear el archivo .env en la raiz del proyecto o con una copia del env.example
- setear en el .env la variable: MIDDLE_API_BASE_URL. 
- si se siguen las intrucciones por defecto del proyecto [mel-bff](https://github.com/arcoslwm/mel-bff) el valor para MIDDLE_API_BASE_URL deberia ser: http://localhost:3001/api

- luego:

```bash
$ npm install
```

## Levantar aplicacion
```bash
npm run build

#luego

npm run start
```
modo desarrollo

```bash
npm run dev
```

abrir [http://localhost:3000](http://localhost:3000) para ver la aplicación


## Todo
- modificar estilos ya que toma colores del tema del sistema operativo.
- agregar tests
