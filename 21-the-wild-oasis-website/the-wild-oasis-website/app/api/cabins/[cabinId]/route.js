import { getBookedDatesByCabinId, getCabin } from "@/app/_libs/data-service";

export async function GET(req, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
    return Response.json({ cabin, bookedDates });
  } catch (e) {
    return Response.json({ message: "Cabin not found" });
  }
}
