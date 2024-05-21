import { useQuery } from "@tanstack/react-query";
import Card from "../components/Card";
import Menu from "../components/Menu";
import { API } from "../utils/makeRequest";

function Home() {
  const { data: videos, isLoading } = useQuery({
    queryKey: ["random"],
    queryFn: async () => {
      try {
        const res = await API.get("/videos/random");

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <div className="flex items-start sm:gap-3 sm:flex-row flex-col h-full">
      <div className="lg:w-[270px] sm:w-[100px] w-full h-[50px] sm:h-[calc(100vh-50px)] sm:sticky top-[50px]">
        <Menu />
      </div>
      <div className="flex-1 w-full sm:border-none border-t border-white/10 overflow-y-auto">
        <div className="sm:p-4 sm:pb-4 pb-2 grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 h-full">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((idx) => (
                <div className="flex flex-col gap-3" key={idx}>
                  <div className="sm:h-[205px] bg-white/10 h-[190px] w-full sm:rounded-xl" />
                  <div className="flex items-start gap-3 px-2">
                    <div>
                      <div className="w-[35px] h-[35px] rounded-full bg-white/10" />
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <div className="h-4 rounded-sm bg-white/10" />
                      <div className="h-4 rounded-sm bg-white/10" />
                    </div>
                  </div>
                </div>
              ))
            : videos.map((video) => <Card key={video._id} video={video} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
