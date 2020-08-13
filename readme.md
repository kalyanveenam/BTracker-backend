To get API DOC :

1. install apidoc
2. write apidoc.json file with required details
   Please use below command
   apidoc -i app/routers -o doc/
   here : app/routers is address where router file is present
   -o output generated

Read from Query params:
req.query
Read from body:
req.body
Read from headers
req.headers
from prameters:
req.params


whenever u perform db operation, result will be available via second parameter in callback
(error,result) , not (result,error)
Run Database:
"E:\mongodb\bin\mongod.exe" --dbpath="E:\mongodb-data"
