const SearchByName = (props) => {
  return (
    <div className="search-by-name">
      <form>
        <input
          type="text"
          value={props.searchText}
          placeholder={"Search by name"}
          onChange={(e) => props.setSearchText(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default SearchByName;
