import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";

const AvatarMenu = ({ closeMenu }: { closeMenu: () => void }) => {
  const user = useAppSelector((state) => state.user.user);
  if (!user) return null;
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar name={user.username} />
      </MenuButton>
      <MenuList zIndex={99} fontSize={"xl"}>
        <MenuItem as={RouterLink} to="/schedules" onClick={closeMenu}>
          My Schedules
        </MenuItem>
        <MenuItem as={RouterLink} to="*" onClick={closeMenu}>
          Log out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
