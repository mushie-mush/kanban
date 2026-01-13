import { Heading } from '@radix-ui/themes';
import Card from './Card';

function Column() {
  return (
    <div className="w-[320px] flex flex-col bg-slate-100 rounded-md p-4">
      <div className="column-title mb-4">
        <Heading as="h2" size="4">
          Column Title
        </Heading>
      </div>
      <div className="column-body flex flex-col gap-4">
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
export default Column;
