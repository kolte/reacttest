import React from "react";

export interface productProp {
  id: string;
  thumbnail: string;
  title: string;
  category: string;
  brand: string;
  description: string;
  price: string;
}

export interface columnProps {
  headTitle: string;
  dataKey: keyof productProp;
  type?: string;
}

interface productTableProps {
  columns: columnProps[];
  data: productProp[];
}

const TableHead = ({ headTitle }: { headTitle: string }) => {
  return (
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {headTitle}
    </th>
  );
};

const TableHeadList = ({ columns }: { columns: columnProps[] }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map(({ dataKey, headTitle }) => (
          <TableHead key={dataKey} headTitle={headTitle} />
        ))}
      </tr>
    </thead>
  );
};

const TableDataCell = ({
  content,
  type,
}: {
  type: string;
  content: string;
}) => {
  switch (type) {
    case "img":
      return (
        <td className="px-6 py-4 whitespace-nowrap">
          <img
            className="h-24 max-w-24 rounded-lg"
            src={content}
            alt="image description"
          ></img>
        </td>
      );

    case "title":
      return <td className="px-6 py-4 whitespace-pre-wrap">{content}</td>;
    case "description":
      return (
        <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">
          {content}
        </td>
      );
    default:
      return (
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {content}
        </td>
      );
  }
};
const TableDataTr = ({
  product,
  columns,
}: {
  product: productProp;
  columns: columnProps[];
}) => {
  return (
    <tr>
      {columns.map(({ dataKey, type }) => {
        return (
          <TableDataCell
            content={product[dataKey]}
            type={type || ""}
            key={dataKey}
          />
        );
      })}
    </tr>
  );
};

const TableBodyList = ({
  data,
  columns,
}: {
  columns: columnProps[];
  data: productProp[];
}) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((product: productProp) => (
        <TableDataTr key={product.id} columns={columns} product={product} />
      ))}
    </tbody>
  );
};

export default function ProductTable({ columns, data }: productTableProps) {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <TableHeadList columns={columns} />
      <TableBodyList data={data} columns={columns} />
    </table>
  );
}
