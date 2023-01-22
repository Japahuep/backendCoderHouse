class UserDto {
  constructor({
    id,
    username,
    password,
    name,
    address,
    age,
    phone,
    photo,
    cart,
  }) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.name = name;
    this.address = address;
    this.age = age;
    this.phone = phone;
    this.photo = photo;
    this.cart = cart;
  }
}

export const asUserDto = (user) => {
  if (Array.isArray(user)) {
    return user.map((u) => new UserDto(u));
  } else {
    return new UserDto(user);
  }
};
