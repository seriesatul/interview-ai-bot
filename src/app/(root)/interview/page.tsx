import Agent from "@/app/components/Agent";
import { getCurrentuser } from "@/lib/actions/auth.action";

const Page = async () => {
  const user = await getCurrentuser();

  return (
    <>
      <h3>Interview generation</h3>

      <Agent userName= "You" userId = "user1" type="generate" />

    </>
  );
};

export default Page;