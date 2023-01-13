import TodosView from "@/components/views/Todos";
import TodosProvider from "@/providers/todos";

const HomePage = () => {
  return (
    <TodosProvider>
      <TodosView />
    </TodosProvider>
  );
};

export default HomePage;
