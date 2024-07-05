import ListItem from "./ListItem";

const ItemList = ({ items, handleDelete }) => {
  return (
    <ul>
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          handleDelete={handleDelete}
        />
      ))}
    </ul>
  );
};

export default ItemList;
