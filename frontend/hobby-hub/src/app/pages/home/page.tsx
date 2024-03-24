"use client";
import Card from "@/app/Components/card";
import { Community } from "@/app/Models/community";

const Home = () => {
  // Sample card data
  const cards: Community[] = [
    {
      id: 1,
      image: "",
      title: "Card 1",
      description: "asd",
    },
    {
      id: 2,
      image: "",
      title: "Card 2",
      description: "asd",
    },
    {
      id: 3,
      image: "",
      title: "Card 3",
      description: "asd",
    },
    {
      id: 4,
      image: "",
      title: "Card 4",
      description: "asd",
    },
    // Add more card data as needed
  ];

  return (
    <div className="container">
      <h1 className="my-4">Welcome to Hobby Hub</h1>
      <div className="row">
        {cards.map((card) => (
          <Card community={card} key={card.id} buttonText="join" {...card} />
        ))}
      </div>
    </div>
  );
};
export default Home;
