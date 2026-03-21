import ClientPage from "./clint-page";
import WhoAmI from "./who-am-i";

export default async function WhoAmIPage() {
  return (
    <ClientPage id={1}>
      <WhoAmI />
    </ClientPage>
  );
}