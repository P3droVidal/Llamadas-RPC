import { Router } from "express";
import { getCaso1Rcp, getCaso2, getCaso3XDR, getCaso4Vectores, getCaso5Errores } from "../controllers/casos";

const userRouter = Router();

userRouter.post("/getCaso1-Rcp", getCaso1Rcp);
userRouter.post("/getCaso2", getCaso2);
userRouter.post("/getCaso3XDR", getCaso3XDR);
userRouter.post("/getCaso4Vectores", getCaso4Vectores);
userRouter.post("/getCaso5Errores", getCaso5Errores);

export default userRouter;