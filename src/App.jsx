import Header from "./components/Header";
import SearchItem from "./components/SearchItem";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import Content from "./components/Content";
import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const api_url = "https://bohirs-server-1.onrender.com";

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await fetch(`${api_url}/items`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network error was not ok: ${errorText}`);
        }
        const newItems = await response.json();
        setItems(newItems);
      } catch (error) {
        console.error("Error fetching items", error.message);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      fetchItems();
    }, 2000);
  }, [api_url]);

  async function addItem() {
    const id = String(Date.now());
    const item = {
      id,
      item: newItem,
      checked: false,
    };
    try {
      const response = await fetch(`${api_url}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      const newItems = [...items, item];
      setItems(newItems);
    } catch (error) {
      console.error("Error creating new item", error.message);
    }
  }

  async function handleDelete(id) {
    try {
      const deleteItem = items.find((item) => item.id === id);
      if (!deleteItem) throw new Error("Item not found");

      const response = await fetch(`${api_url}/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const newItems = items.filter((item) => item.id !== id);
      setItems(newItems);
    } catch (error) {
      console.error("Error deleting item", error.message);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    addItem();
    setNewItem("");
  }

  return (
    <div className="App">
      <Header title="Grocery List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} onSearch={setSearch} />

      <main>
        {isLoading && <p>Loading...</p>}
        {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}
        {!isLoading && !fetchError && (
          <Content
            items={items.filter((item) =>
              item.item.toLowerCase().includes(search.toLowerCase())
            )}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;
