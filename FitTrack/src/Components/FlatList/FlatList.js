import { FlatListStyle } from "./style";

const FlatListComponent = ({ data, renderItem, keyExtractor, style }) => {
  return (
    <FlatListStyle
      style={style}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

export default FlatListComponent;
