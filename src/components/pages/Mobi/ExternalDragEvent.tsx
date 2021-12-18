import React, { useState, useCallback } from 'react'
import { Draggable } from "@mobiscroll/react"

export const ExternalDragEvent = () => {
  const [draggable, setDraggable] = useState();
  // 外部ドロップ用
  const newEvent = {
    title: 'new Event',
    start: new Date(2021, 11, 10, 0),
    end: new Date(2021, 11, 12, 0),
    color: 'yellow',
  }

  const setDrag = useCallback((event) => {
    setDraggable(event);
  }, []);

  return (
    <>
      <div ref={setDrag}>newEvent</div>
      <Draggable dragData={newEvent} element={draggable}/>
    </>
  )
}
