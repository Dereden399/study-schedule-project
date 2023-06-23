import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Avatar,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const AvatarMenu = ({ closeMenu }: { closeMenu: () => void }) => (
  <Menu>
    <MenuButton
      as={Button}
      rounded={"full"}
      variant={"link"}
      cursor={"pointer"}
      minW={0}
    >
      <Avatar name="TEST NAME" />
    </MenuButton>
    <MenuList zIndex={99} fontSize={"xl"}>
      <MenuItem as={RouterLink} to="/user" onClick={closeMenu}>
        Profile
      </MenuItem>
      <MenuItem as={RouterLink} to="/schedules" onClick={closeMenu}>
        My Schedules
      </MenuItem>
      <MenuItem as={RouterLink} to="*" onClick={closeMenu}>
        Log out
      </MenuItem>
    </MenuList>
  </Menu>
);

export default AvatarMenu;
