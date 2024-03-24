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

export async function GetCommunityByUserId(
  userId: number
): Promise<Community[]> {
  const competition = await communities.filter((comp) => comp.id == userId);
  if (competition) {
    return competition;
  }
  throw new Error(`Competition with id ${userId} not found`);
}

export async function GetCommunityByTitle(title: string): Promise<Community> {
  const community = await communities.find((comp) => comp.title == title);
  if (community) {
    return community;
  }
  throw new Error(`Competition with id ${title} not found`);
}

export async function AddCommunity(community: Community): Promise<Community> {
  communities.push(community);
  return community;
}

export async function UpdateCommunity(
  community: Community
): Promise<Community> {
  const index = communities.findIndex((comp) => comp.id == community.id);
  if (index != -1) {
    communities[index] = community;
    return community;
  }
  throw new Error(`Community with id ${community.id} not found

`);
}

export async function DeleteCommunity(id: number): Promise<void> {
  const index = communities.findIndex((comp) => comp.id == id);
  if (index != -1) {
    communities.splice(index, 1);
    return;
  }
  throw new Error(`Community with id ${id} not found`);
}

// Path: hobby-hub/src/app/services/CommunityService.tsx
