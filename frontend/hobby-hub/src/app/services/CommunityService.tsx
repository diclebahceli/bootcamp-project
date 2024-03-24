import { Community } from "../Models/community";

const communities: Community[] = [
  {
    id: 1,
    title: "Card 1",
    description: "asd",
    image: "",
  },
  {
    id: 2,
    title: "Card 2",
    description: "asd",
    image: "",
  },
  {
    id: 3,
    title: "Card 3",
    description: "asd",
    image: "",
  },
  {
    id: 4,
    title: "Card 4",
    description: "asd",
    image: "",
  },
];

export async function GetAllCommmunities(): Promise<Community[]> {
  return communities;
}

export async function GetCompetitionById(id: number): Promise<Community> {
  // console.log(typeof(id));
  // console.log(typeof(competitions[0].id));
  const competition = await communities.find((comp) => comp.id == id);
  if (competition) {
    return competition;
  }
  throw new Error(`Competition with id ${id} not found`);
}
