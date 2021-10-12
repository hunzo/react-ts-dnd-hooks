import React, { useRef, useState } from 'react'
import '../App.css'

interface Data {
    title: string
    items: string[]
}

interface Props {
    data: Data[]
}

interface CoOrdinate {
    groupIndex: number
    itemIndex: number
}

const DragNDrop: React.FC<Props> = ({ data }) => {
    const [list, setList] = useState<Data[]>(data)
    const [dragging, setDragging] = useState(false)

    const initialCoOrdiate: CoOrdinate = {
        groupIndex: 0,
        itemIndex: 0,
    }

    const dragItem = useRef<CoOrdinate>(initialCoOrdiate)
    const dragNode = useRef<EventTarget>()

    // const handleDragStart = (e: React.DragEvent, params: CoOrd) => {
    const handleDragStart = (
        e: React.DragEvent,
        groupIndex: number,
        itemIndex: number
    ) => {
        const params: CoOrdinate = {
            groupIndex: groupIndex,
            itemIndex: itemIndex,
        }
        dragItem.current = params
        dragNode.current = e.target
        dragNode.current.addEventListener('dragend', handleDragEnd)
        setTimeout(() => {
            setDragging(true)
        }, 0)

        console.log('drag start..')
        console.log(
            `co-ordinate ->  group: ${params.groupIndex}, item: ${params.itemIndex}`
        )
    }

    const handleDragEnd = () => {
        setDragging(false)
        dragNode.current?.removeEventListener('dragend', handleDragEnd)
        dragItem.current = initialCoOrdiate
        dragNode.current = undefined

        console.log({
            dragNode: dragNode.current,
            dragItem: dragItem.current,
            status: 'clear useRef',
        })
        console.log('Ending Drag...')
    }

    const handleDragEnter = (
        e: React.DragEvent,
        groupIndex: number,
        itemIndex: number
    ) => {
        console.log('Entering drag ...')
        const params: CoOrdinate = {
            groupIndex: groupIndex,
            itemIndex: itemIndex,
        }

        const currentItem = dragItem.current
        console.log(
            `source group: ${currentItem?.groupIndex} item: ${currentItem?.itemIndex}`
        )
        console.log(
            `dest group: ${params.groupIndex} item: ${params.itemIndex}`
        )

        if (e.target !== dragNode.current) {
            console.log('CHECK: if co-ordinate target not the same => OK!!')
            setList((oldList) => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[params.groupIndex].items.splice(
                    params.itemIndex,
                    0,
                    newList[currentItem.groupIndex].items.splice(
                        currentItem.itemIndex,
                        1
                    )[0]
                )
                // console.log(newList)
                dragItem.current = params

                return newList
            })
        }
    }

    const getStyles = (groupIndex: number, itemIndex: number) => {
        const currentItem = dragItem.current
        if (
            currentItem.groupIndex === groupIndex &&
            currentItem.itemIndex === itemIndex
        ) {
            return 'current box-items'
        }
        return 'box-items'
    }

    return (
        <div className="box-container">
            {list.map((grp, grpIdx) => (
                <div
                    key={grp.title}
                    className="box-group"
                    onDragEnter={
                        dragging && !grp.items.length
                            ? (e) => {
                                  handleDragEnter(e, grpIdx, 0)
                              }
                            : undefined
                    }
                >
                    <div className="group-title">{grp.title}</div>
                    {grp.items.map((item, itemIdx) => (
                        <div
                            draggable
                            onDragStart={(e) =>
                                handleDragStart(e, grpIdx, itemIdx)
                            }
                            onDragEnter={
                                dragging
                                    ? (e) => handleDragEnter(e, grpIdx, itemIdx)
                                    : undefined
                            }
                            key={item}
                            className={
                                dragging
                                    ? getStyles(grpIdx, itemIdx)
                                    : 'box-items'
                            }
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default DragNDrop
