import React from 'react'
import { useTable } from 'react-table'
import { useCallback } from 'react'

const Table = ({ data, dataset, schema, total }) => {
  const pageSize = 100

  const getFields = useCallback(() => {
    if (schema && schema.fields) {
      return schema.fields
    }
    const fields = []
    for (let key in data[0]) {
      fields.push({
        name: key,
      })
    }
    return fields
  }, [data, schema])

  data = React.useMemo(
    () =>
      data.map((rows) => {
        const row = { ...rows }
        // If field display attributes exist (these can be custom, eg, in
        // EDS, we use 'size' attribute which isn't part of tableschema spec)
        // use it to alter the data for presentation. Eg, "100.2312313" => "100.23".
        const fields = getFields()
        fields.forEach((field) => {
          const fieldSize =
            field.size || (field.constraints && field.constraints.size)
          if (fieldSize && row[field.name] !== null) {
            const sizeParts = fieldSize.toString().split('.')

            // Format datetime values according to EDS requirements
            if (field.name.includes('UTC') && field.type === 'datetime') {
              row[field.name] = row[field.name].replace(
                /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}):(\d{2})(\+\d{2}:\d{2})*/,
                '$1 $2Z'
              )
            } else if (
              field.name.includes('DK') &&
              field.type === 'datetime'
            ) {
              row[field.name] = row[field.name].replace(
                /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}):(\d{2})/,
                '$1 $2'
              )
            } else if (sizeParts[1]) {
              sizeParts[1] = parseInt(sizeParts[1])
              row[field.name] = row[field.name].toLocaleString(undefined, {
                minimumFractionDigits: sizeParts[1],
                maximumFractionDigits: sizeParts[1],
              })
            } else {
              sizeParts[0] = parseInt(sizeParts[0])
              row[field.name] =
                row[field.name] &&
                row[field.name].toString().slice(0, sizeParts[0])

              if (field.type === 'integer') {
                row[field.name] = parseInt(row[field.name])
              } else if (field.type === 'number') {
                row[field.name] = parseFloat(row[field.name])
              }
            }
          }
          row[field.name] = row[field.name] && row[field.name].toLocaleString()
        })

        return row
      }),
    [getFields, data]
  )

  const columns = React.useMemo(
    () =>
      getFields().map((field, index) => {
        return {
          Header: field.title || field.name,
          accessor: field.name,
          Cell: (props) => (
            <div className={field.type || ''}>
              <span>{props.value}</span>
            </div>
          ),
          width:
            index === 0 && (1280 * 0.8333 - 30) / getFields().length < 130
              ? 130
              : undefined,
        }
      }),
    [getFields]
  )

  const tableInstance = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance

  return (
    <div data-testid="reactTable">
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: '10px',
                        border: 'solid 1px gray',
                        background: 'papayawhip',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
