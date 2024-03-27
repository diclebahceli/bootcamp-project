export default function CreateUserPage() {
    
    const handleCreateUser = async (userId: string) => {
    
        try {
          // Example: Sending a POST request to create the user
          const response = await CreateUser(user); // Replace '/api/users' with your actual create endpoint
          // If successful, you may want to re-fetch the users list or update the state accordingly
          fetchUsers();
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }


      
}