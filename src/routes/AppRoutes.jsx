import React from "react";
import { Routes, Route } from "react-router-dom";

import StartPage from "../pages/StartPage";
import MakeTicketPage from "../pages/MakeTicketPage";
import ResultPage from "../pages/ResultPage";
import ViewTicketsPage from "../pages/ViewTicketsPage";
import FilterPage from "../pages/FilterPage";
import TestButton from "../pages/TestButton";
import InputTicketPage from "../pages/InputTicketPage";
import EmotionPage from "../pages/TicketsEmotionPage";
import StylePage from "../pages/TicketsStylePage";
import FunnyPage from "../pages/TicketsFunnyPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StartPage />} />
      <Route path="/input" element={<InputTicketPage />} />
      <Route path="/make" element={<MakeTicketPage />} />
      <Route path="/result" element={<ResultPage />} />
      <Route path="/tickets" element={<ViewTicketsPage />} />
      <Route path="/filter" element={<FilterPage />} />
      <Route path="/testbutton" element={<TestButton />} />
      <Route path="/tickets/emotion" element={<EmotionPage />} />
      <Route path="/tickets/style" element={<StylePage />} />
      <Route path="/tickets/funny" element={<FunnyPage />} />
    </Routes>
  );
};

export default AppRoutes;