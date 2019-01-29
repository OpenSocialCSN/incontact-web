import React from "react";

import { LinkAccounts } from "../../reusable";

export default function OnboardingScreen({ user = {} }) {
  return (
    <div className="Onboarding Onboard-screen">
      <div className="Onboard-card card">
        <LinkAccounts user={user} />
      </div>
    </div>
  );
}
