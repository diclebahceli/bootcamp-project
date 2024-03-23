import Card from "@/app/Components/card";

const HomePage = () => {
  // Sample card data
  const cards = [
    {
      id: 1,
      image: "",
      title: "Card 1",
      description: "asd",
      buttonText: "Join",
    },
    {
      id: 2,
      image: "",
      title: "Card 2",
      description: "asd",
      buttonText: "Join",
    },
    {
      id: 3,
      image: "",
      title: "Card 3",
      description: "asd",
      buttonText: "Join",
    },
    {
      id: 4,
      image: "",
      title: "Card 4",
      description: "asd",
      buttonText: "Join",
    },
    // Add more card data as needed
  ];

  return (
    <div className="container">
      <h1 className="my-4">Welcome to Hobby Hub</h1>
      <div className="row">
        {cards.map((card) => (
          <Card key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
