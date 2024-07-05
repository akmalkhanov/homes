import ItemList from "./ItemList";

const Content = ({ items, handleDelete }) => {
  return (
    <>
      {items.length ? (
        <ItemList items={items} handleDelete={handleDelete} />
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </>
  );
};

export default Content;
