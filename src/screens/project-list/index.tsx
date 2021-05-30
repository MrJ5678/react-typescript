import { SearchPanel } from "./search-panel";
import { List } from "./list";
import React, { useEffect, useState } from "react";
import { cleanObject, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 2000);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </div>
  );
};
