import { Searchbar } from "react-native-paper";

interface Props {
  value: string;
  onChangeText: (val: string) => void;
}

export const SearchBar = ({ value, onChangeText }: Props) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeText}
      value={value}
      style={{
        marginBottom: 15,
        backgroundColor: "white",
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 0.25,
      }}
    />
  );
};
