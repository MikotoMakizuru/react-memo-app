import React, { useState, useEffect } from "react";

const MemoForm = ({
  addMemo,
  selectedMemo,
  deleteMemo,
  editMemo,
  setSelectedMemo,
}) => {
  const [memo, setMemo] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedMemo.memo && selectedMemo.isVisible) {
      setMemo(selectedMemo.memo.text);
      setIsEditing(true);
    }
  }, [selectedMemo]);

  const openForm = () => {
    setSelectedMemo({ isVisible: true });
    setMemo("");
    setIsEditing(false);
  };

  const closeForm = () => {
    setSelectedMemo({ isVisible: false });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memo.trim() === "") return;
    addMemo(memo);
    setMemo("");
    closeForm();
  };

  const handleDelete = () => {
    if (!selectedMemo) return;
    deleteMemo(selectedMemo.memo.id);
    setMemo("");
    closeForm();
  };

  const handleEdit = () => {
    if (selectedMemo.memo.text === memo) return;
    editMemo(memo, selectedMemo.memo.id);
    setMemo("");
    closeForm();
  };

  return (
    <div>
      {selectedMemo.isVisible ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              メモ
              <br />
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="メモを入力してください"
              />
            </label>
          </div>
          <div>
            {isEditing ? (
              <>
                <button type="button" onClick={handleEdit}>
                  編集
                </button>
                <button type="button" onClick={handleDelete}>
                  削除
                </button>
              </>
            ) : (
              <>
                <button type="button" onClick={closeForm}>
                  キャンセル
                </button>
                <button type="submit">作成</button>
              </>
            )}
          </div>
        </form>
      ) : (
        <a href="#" onClick={openForm}>
          ＋
        </a>
      )}
    </div>
  );
};

export default MemoForm;
