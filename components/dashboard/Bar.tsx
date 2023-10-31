import { BarChart, Card, Subtitle, Title } from "@tremor/react";

  const chartdata = [
    {
      name: "Amphibians",
      "Number of threatened species": 2488,
    },
    {
      name: "Birds",
      "Number of threatened species": 1445,
    },
    {
      name: "Crustaceans",
      "Number of threatened species": 743,
    },
    {
      name: "Ferns",
      "Number of threatened species": 281,
    },
    {
      name: "Arachnids",
      "Number of threatened species": 251,
    },
    {
      name: "Corals",
      "Number of threatened species": 232,
    },
    {
      name: "Algae",
      "Number of threatened species": 98,
    },
  ];


export default function Bar({bardata} : any)
{return (
  <Card className="mt-5">
    <Title></Title>
    <BarChart
      className="mt-6"
      data={chartdata}
      index="name"
      categories={["Number of threatened species"]}
      colors={["yellow"]}
      yAxisWidth={48}
    />
  </Card>
)}