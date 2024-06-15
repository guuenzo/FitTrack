import { FlatListStyle } from "./style";

const FlatListComponent = ({
  data,
  renderItem,
  numColumns,
  keyExtractor,
  style,
  contentContainerStyle,
  fieldMargin,
}) => {
  return (
    <FlatListStyle
      fieldMargin={fieldMargin}
      style={style}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={contentContainerStyle}
      numColumns={numColumns}
    />
  );
};

export default FlatListComponent;
