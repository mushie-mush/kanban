import { ModeToggle } from '../ui/ModeToggle';

function Navbar() {
  return (
    <div className="w-full h-16 border-b flex items-center px-4">
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </div>
  );
}
export default Navbar;
