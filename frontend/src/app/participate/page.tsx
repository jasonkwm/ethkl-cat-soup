"use client";
import Dashboard from "@/components/participate/Dashboard";
import SelectedSurvey from "@/components/participate/SelectedSurvey";
import { useParticipantContext } from "@/context/ParticipantProvider";

export default function Home() {
  const { selectedSurvey } = useParticipantContext();
  if (selectedSurvey) return <SelectedSurvey />;
  return <Dashboard />;
}
