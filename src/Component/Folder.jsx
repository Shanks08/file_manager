import { useState } from 'react';

export default function Folder({ folder, root, par, parRender, parCurr }) {
  console.log('RENDERS');

  let [expand, setExpand] = useState(false);
  const [newInputBox, setNewInputBox] = useState({
    show: false,
    isFolder: false,
  });
  const [inputValue, setInputValue] = useState('');
  const [editInput, setEditInput] = useState(false);
  const [tick, setTick] = useState(1);

  function handleAdd(e, isFolder) {
    e.stopPropagation();
    setNewInputBox({ show: true, isFolder });
  }

  // useEffect(() => {}, [root]);

  function handleNewInput(e) {
    setInputValue(e.target.value);
  }

  function handleEnterKey(e) {
    // setInputValue(e.target.value);
    if (e.keyCode === 13) {
      setNewInputBox(false);
      if (newInputBox.isFolder) {
        let newObj = {
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          name: inputValue,
          isFolder: true,
          items: [],
        };
        folder.items.unshift(newObj);
      } else {
        let newObj = {
          id: Date.now().toString(36) + Math.random().toString(36).substr(2),
          name: inputValue,
          isFolder: false,
        };
        folder.items.push(newObj);
      }
      root = { ...root };
      setInputValue('');
      setExpand(true);
    }
  }

  function handleDel(e) {
    e.stopPropagation();
    par.items = par.items.filter((item) => {
      return item.id !== folder.id;
    });
    par = { ...par };
    parRender(++parCurr);
  }

  function handleEdit(e) {
    e.stopPropagation();
    setEditInput(true);
  }

  function editName(e) {
    e.stopPropagation();
    if (e.keyCode === 13) {
      folder.name = e.target.value;
      root = { ...root };
      setEditInput(false);
    }
  }

  return (
    <>
      {!folder.isFolder ? ( // is File
        <div className="file_wrapper">
          <span>
            📄{' '}
            {editInput ? (
              <input
                autoFocus
                onKeyDown={editName}
                className="edit_input"
                type="text"
                onBlur={() => setEditInput(false)}
              />
            ) : (
              folder.name
            )}
          </span>
          <div className="folder_button_container">
            <button onClick={(e) => handleDel(e)}> ☠️</button>
            <button onClick={(e) => handleEdit(e)}> 🖋️</button>
          </div>
        </div>
      ) : (
        <div>
          <div className="folder_wrapper" onClick={() => setExpand(!expand)}>
            <div className="folder_name_container">
              <span>{expand ? '📂' : '📁'}</span>
              {editInput ? (
                <input
                  autoFocus
                  onKeyDown={editName}
                  className="edit_input"
                  type="text"
                  onBlur={() => setEditInput(false)}
                />
              ) : (
                folder.name
              )}
            </div>
            <div className="folder_button_container">
              <button onClick={(e) => handleAdd(e, true)}> +📁</button>
              <button onClick={(e) => handleAdd(e, false)}> +📄</button>
              {par && <button onClick={(e) => handleDel(e)}> ☠️</button>}
              <button onClick={(e) => handleEdit(e)}> 🖋️</button>
            </div>
          </div>
          <div
            style={{
              paddingLeft: 15,
            }}
          >
            {newInputBox.show && (
              <input
                value={inputValue}
                autoFocus
                onBlur={() => setNewInputBox(false)}
                onChange={handleNewInput}
                onKeyDown={handleEnterKey}
                type="text"
              />
            )}
          </div>
          <div
            style={{
              paddingLeft: 15,
              display: expand ? 'block' : 'none',
            }}
          >
            {folder.items.map((obj) => {
              return (
                <Folder
                  key={
                    Date.now().toString(36) +
                    Math.random().toString(36).substr(2)
                  }
                  folder={obj}
                  root={root}
                  par={folder}
                  parRender={setTick}
                  parCurr={tick}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
