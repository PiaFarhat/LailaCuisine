export type WineTastingReservationPayload = {
  fullName: string;
  email: string;
  phone: string;
  preferredSaturday: string;
  guests: string;
  dietaryRestrictions: string;
  nonAlcoholicOption: boolean;
  notes: string;
  legalAgeConfirmed: boolean;
};

export type WineTastingReservationResult = {
  ok: boolean;
  message: string;
};

export async function submitWineTastingReservation(
  payload: WineTastingReservationPayload,
): Promise<WineTastingReservationResult> {
  void payload;

  await new Promise((resolve) => {
    window.setTimeout(resolve, 650);
  });

  return {
    ok: true,
    message: "Your wine-tasting request has been received. We will follow up shortly.",
  };
}
