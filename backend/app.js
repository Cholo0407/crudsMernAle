// Importo todo lo de la libreria de Express
import express from "express";
import productsRoutes from "./src/routes/products.js";
import clientsRoutes from "./src/routes/clientes.js";
import employeesRoutes from "./src/routes/employees.js";
import branchesRoutes from "./src/routes/branches.js";
import reviewsRoutes from "./src/routes/reviews.js"
import registerEmployerRoutes from "./src/routes/registerEmployees.js"
import loginRoutes from "./src/routes/login.js"
import logoutRoutes from "./src/routes/logout.js"
import cookieParser from "cookie-parser";


// Creo una constante que es igual a la libreria que importé
const app = express();

//Que acepte datos en json
app.use(express.json());
//que acepte guardar cookies
app.use(cookieParser());

// Definir las rutas de las funciones que tendrá la página web
app.use("/api/products", productsRoutes);
app.use("/api/customers", clientsRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/branches", branchesRoutes);
app.use("/api/reviews", reviewsRoutes);

app.use("/api/registerEmployees", registerEmployerRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)

// Exporto la constante para poder usar express en otros archivos
export default app;
