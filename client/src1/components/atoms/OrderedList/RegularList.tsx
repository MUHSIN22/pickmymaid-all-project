
export default function RegularList({ list }: { list: string[] }) {
  return (
    <ul className="pl-6">
      {list.map((listItem, index) => (
        <li className="list-disc" key={index}>
          <p className="text-description">{listItem}</p>
        </li>
      ))}
    </ul>
  );
}
