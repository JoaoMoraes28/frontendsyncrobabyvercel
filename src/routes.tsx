import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Presentaion } from "./pages/presentation/Presentation";
import { Login } from "./pages/auth/Login/Login";
import { Register } from "./pages/auth/Register/Register";
import { ResetPassword } from "./pages/auth/ResetPassword/ResetPassword";
import { Home } from "./pages/Home/Home";
import Routines from "./pages/routines/Routines";
import { MainLayout } from "./layouts/MainLayout";
import RoutineFeeding from "./pages/routines/RoutineFeeding";
import NotFound from "./pages/notFound/NotFound";
import { Storage } from "./pages/storage/Storage";
import RoutineSleep from "./pages/routines/RoutineSleep";
import { Health } from "./pages/health/Health";
import { Professional } from "./pages/professional/Professional";
import RoutineDiaper from "./pages/routines/RoutineDiaper";
import { Vaccines } from "./pages/vaccines/Vaccines";
import RoutineShower from "./pages/routines/RoutineShower";
import RoutineMedicine from "./pages/routines/RoutineMedicine";
import ProfileChildren from "./pages/profile_children/ProfileChildren";
import Articles from "./pages/articles/Articles";
import ArticleContent from "./pages/articles/Article";
import { AddPediatrician } from "./pages/professional/pages/AddPediatrician";
import { EditPediatrician } from "./pages/professional/pages/EditPediatrician";
import { AddIllness } from "./pages/health/pages/AddIllness";
import Measures from "./pages/measures/Measures";
import { PerfilPage } from "./pages/perfil/PerfilPage";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Presentaion />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile-user" element={<PerfilPage />} />
        <Route path="/profile-children" element={<ProfileChildren />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/feeding" element={<RoutineFeeding />} />
          <Route path="/sleep" element={<RoutineSleep />} />
          <Route path="/diaper" element={<RoutineDiaper />} />
          <Route path="/shower" element={<RoutineShower />} />
          <Route path="/medicine" element={<RoutineMedicine />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/health" element={<Health />} />
          <Route path="/pediatrician" element={<Professional />} />
          <Route path="/vaccines" element={<Vaccines />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:articleId" element={<ArticleContent />} />
          <Route path="/add-pediatrician" element={<AddPediatrician />} />
          <Route path="/edit-pediatrician" element={<EditPediatrician />} />
          <Route path="/add-illness" element={<AddIllness />} />
          <Route path="/measures" element={<Measures />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
