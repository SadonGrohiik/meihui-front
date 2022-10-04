import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  BigIntegerAttribute,
  TextAttribute,
  RichTextAttribute,
  MediaAttribute,
  ComponentAttribute,
  ComponentSchema,
} from "@strapi/strapi";

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: "Permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<"admin::permission", "manyToOne", "admin::role">;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: "User";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<"admin::user", "manyToMany", "admin::role"> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::user", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: "Role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<"admin::role", "manyToMany", "admin::user">;
    permissions: RelationAttribute<
      "admin::role",
      "oneToMany",
      "admin::permission"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"admin::role", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: "Api Token";
    singularName: "api-token";
    pluralName: "api-tokens";
    displayName: "Api Token";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<"">;
    type: EnumerationAttribute<["read-only", "full-access"]> &
      DefaultTo<"read-only">;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "admin::api-token",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: "file";
    pluralName: "files";
    displayName: "File";
    description: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<"plugin::upload.file", "morphToMany">;
    folder: RelationAttribute<
      "plugin::upload.file",
      "manyToOne",
      "plugin::upload.folder"
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.file",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: "folder";
    pluralName: "folders";
    displayName: "Folder";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      "plugin::upload.folder",
      "manyToOne",
      "plugin::upload.folder"
    >;
    children: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.folder"
    >;
    files: RelationAttribute<
      "plugin::upload.folder",
      "oneToMany",
      "plugin::upload.file"
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::upload.folder",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginAwesomeHelpHelp extends CollectionTypeSchema {
  info: {
    singularName: "help";
    pluralName: "helps";
    displayName: "help";
  };
  options: {
    draftAndPublish: false;
    comment: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    contentType: StringAttribute;
    path: StringAttribute;
    helpContent: StringAttribute;
    fieldName: StringAttribute;
    containerType: StringAttribute;
    zoneName: StringAttribute;
    componentName: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::awesome-help.help",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::awesome-help.help",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: "locale";
    pluralName: "locales";
    collectionName: "locales";
    displayName: "Locale";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::i18n.locale",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: "permission";
    description: "";
    singularName: "permission";
    pluralName: "permissions";
    displayName: "Permission";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      "plugin::users-permissions.permission",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.permission",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: "role";
    description: "";
    singularName: "role";
    pluralName: "roles";
    displayName: "Role";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.permission"
    >;
    users: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToMany",
      "plugin::users-permissions.user"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.role",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface User extends CollectionTypeSchema {
  info: {
    name: "user";
    description: "";
    singularName: "user";
    pluralName: "users";
    displayName: "User";
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      "plugin::users-permissions.user",
      "manyToOne",
      "plugin::users-permissions.role"
    >;
    cart: RelationAttribute<
      "plugin::users-permissions.user",
      "manyToMany",
      "api::product.product"
    >;
    full_name: StringAttribute & RequiredAttribute;
    province: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "api::province.province"
    >;
    city: StringAttribute;
    phone: StringAttribute & UniqueAttribute;
    postcode: StringAttribute;
    orders: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToMany",
      "api::order.order"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::users-permissions.user",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginCustomLinksCustomLink extends CollectionTypeSchema {
  info: {
    name: "custom-link";
    singularName: "custom-link";
    pluralName: "custom-links";
    displayName: "Custom Links";
  };
  options: {
    draftAndPublish: false;
    comment: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    uri: StringAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    kind: StringAttribute;
    contentId: BigIntegerAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::custom-links.custom-link",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::custom-links.custom-link",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface PluginCustomLinksTempuri extends CollectionTypeSchema {
  info: {
    singularName: "tempuri";
    pluralName: "tempuri";
    displayName: "tempuri";
  };
  options: {
    draftAndPublish: false;
    comment: "";
  };
  pluginOptions: {
    "content-manager": {
      visible: false;
    };
    "content-type-builder": {
      visible: false;
    };
  };
  attributes: {
    uri: StringAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "plugin::custom-links.tempuri",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "plugin::custom-links.tempuri",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiCategoryCategory extends CollectionTypeSchema {
  info: {
    singularName: "category";
    pluralName: "categories";
    displayName: "Category";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    Name: StringAttribute;
    products: RelationAttribute<
      "api::category.category",
      "oneToMany",
      "api::product.product"
    >;
    Parent: RelationAttribute<
      "api::category.category",
      "manyToOne",
      "api::category.category"
    >;
    Children: RelationAttribute<
      "api::category.category",
      "oneToMany",
      "api::category.category"
    >;
    primary: BooleanAttribute;
    slug: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::category.category",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::category.category",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiColorColor extends CollectionTypeSchema {
  info: {
    singularName: "color";
    pluralName: "colors";
    displayName: "Color";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    Name: StringAttribute & RequiredAttribute & UniqueAttribute;
    Hash: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
        maxLength: 6;
      }>;
    products: RelationAttribute<
      "api::color.color",
      "oneToMany",
      "api::product.product"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::color.color",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::color.color",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiInstagramHashtagInstagramHashtag
  extends CollectionTypeSchema {
  info: {
    singularName: "instagram-hashtag";
    pluralName: "instagram-hashtags";
    displayName: "Instagram_hashtag";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    tag: StringAttribute;
    products: RelationAttribute<
      "api::instagram-hashtag.instagram-hashtag",
      "manyToMany",
      "api::product.product"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::instagram-hashtag.instagram-hashtag",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::instagram-hashtag.instagram-hashtag",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiOrderOrder extends CollectionTypeSchema {
  info: {
    singularName: "order";
    pluralName: "orders";
    displayName: "order";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    products: RelationAttribute<
      "api::order.order",
      "manyToMany",
      "api::product.product"
    >;
    code: StringAttribute & UniqueAttribute;
    address: TextAttribute & RequiredAttribute;
    cost: BigIntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: "1";
      }>;
    users_permissions_user: RelationAttribute<
      "api::order.order",
      "manyToOne",
      "plugin::users-permissions.user"
    >;
    sent: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    processing: BooleanAttribute & RequiredAttribute & DefaultTo<true>;
    received: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    cancelled: BooleanAttribute & RequiredAttribute & DefaultTo<false>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::order.order",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::order.order",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiProductProduct extends CollectionTypeSchema {
  info: {
    singularName: "product";
    pluralName: "products";
    displayName: "Product";
    description: "";
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: StringAttribute & RequiredAttribute & UniqueAttribute;
    Description: RichTextAttribute;
    Price: BigIntegerAttribute & RequiredAttribute;
    Stock: BigIntegerAttribute;
    Images: MediaAttribute & RequiredAttribute;
    color: RelationAttribute<
      "api::product.product",
      "manyToOne",
      "api::color.color"
    >;
    category: RelationAttribute<
      "api::product.product",
      "manyToOne",
      "api::category.category"
    >;
    tags: RelationAttribute<
      "api::product.product",
      "manyToMany",
      "api::tag.tag"
    >;
    instagram_hashtags: RelationAttribute<
      "api::product.product",
      "manyToMany",
      "api::instagram-hashtag.instagram-hashtag"
    >;
    cost: BigIntegerAttribute & RequiredAttribute;
    discount: IntegerAttribute &
      SetMinMax<{
        min: 0;
        max: 100;
      }>;
    Details: ComponentAttribute<"product.details", true>;
    Sales: IntegerAttribute & RequiredAttribute & DefaultTo<0>;
    slug: StringAttribute & RequiredAttribute & UniqueAttribute;
    users: RelationAttribute<
      "api::product.product",
      "manyToMany",
      "plugin::users-permissions.user"
    >;
    orders: RelationAttribute<
      "api::product.product",
      "manyToMany",
      "api::order.order"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::product.product",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::product.product",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiProvinceProvince extends CollectionTypeSchema {
  info: {
    singularName: "province";
    pluralName: "provinces";
    displayName: "province";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    Name: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::province.province",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::province.province",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiTagTag extends CollectionTypeSchema {
  info: {
    singularName: "tag";
    pluralName: "tags";
    displayName: "Tag";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    tag: StringAttribute;
    products: RelationAttribute<
      "api::tag.tag",
      "manyToMany",
      "api::product.product"
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<"api::tag.tag", "oneToOne", "admin::user"> &
      PrivateAttribute;
    updatedBy: RelationAttribute<"api::tag.tag", "oneToOne", "admin::user"> &
      PrivateAttribute;
  };
}

export interface ApiWigConstructionWigConstruction
  extends CollectionTypeSchema {
  info: {
    singularName: "wig-construction";
    pluralName: "wig-constructions";
    displayName: "Wig_construction";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    value: StringAttribute & RequiredAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::wig-construction.wig-construction",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::wig-construction.wig-construction",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiWigCrownWigCrown extends CollectionTypeSchema {
  info: {
    singularName: "wig-crown";
    pluralName: "wig-crowns";
    displayName: "Wig_crown";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    value: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::wig-crown.wig-crown",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::wig-crown.wig-crown",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiWigLengthWigLength extends CollectionTypeSchema {
  info: {
    singularName: "wig-length";
    pluralName: "wig-lengths";
    displayName: "wig_length";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    value: StringAttribute & RequiredAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::wig-length.wig-length",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::wig-length.wig-length",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiWigMaterialWigMaterial extends CollectionTypeSchema {
  info: {
    singularName: "wig-material";
    pluralName: "wig-materials";
    displayName: "Wig_material";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    value: StringAttribute & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::wig-material.wig-material",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::wig-material.wig-material",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiWigStyleWigStyle extends CollectionTypeSchema {
  info: {
    singularName: "wig-style";
    pluralName: "wig-styles";
    displayName: "Wig_style";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    value: StringAttribute & RequiredAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::wig-style.wig-style",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::wig-style.wig-style",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiWigTopWigTop extends CollectionTypeSchema {
  info: {
    singularName: "wig-top";
    pluralName: "wig-tops";
    displayName: "Wig_top";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    value: StringAttribute & RequiredAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::wig-top.wig-top",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::wig-top.wig-top",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface ApiWigTypeWigType extends CollectionTypeSchema {
  info: {
    singularName: "wig-type";
    pluralName: "wig-types";
    displayName: "Wig_type";
    description: "";
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    value: StringAttribute & RequiredAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      "api::wig-type.wig-type",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      "api::wig-type.wig-type",
      "oneToOne",
      "admin::user"
    > &
      PrivateAttribute;
  };
}

export interface BuyerAddress extends ComponentSchema {
  info: {
    displayName: "Address";
    icon: "dolly-flatbed";
    description: "";
  };
  attributes: {
    province: RelationAttribute<
      "buyer.address",
      "oneToOne",
      "api::province.province"
    >;
    City: StringAttribute & RequiredAttribute;
    PostalAddress: TextAttribute & RequiredAttribute;
    PostalCode: BigIntegerAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: "1000000000";
        max: "9999999999";
      }>;
    Plak: IntegerAttribute & RequiredAttribute;
  };
}

export interface ProductDetailsList extends ComponentSchema {
  info: {
    displayName: "DetailsList";
    icon: "align-left";
  };
  attributes: {
    Detail: ComponentAttribute<"product.details", true>;
  };
}

export interface ProductDetails extends ComponentSchema {
  info: {
    displayName: "Details";
    icon: "eye";
    description: "";
  };
  attributes: {
    Name: StringAttribute & RequiredAttribute;
    Value: StringAttribute & RequiredAttribute;
  };
}

export interface ProductWigDetails extends ComponentSchema {
  info: {
    displayName: "wig_details";
    description: "";
  };
  attributes: {
    wig_length: RelationAttribute<
      "product.wig-details",
      "oneToOne",
      "api::wig-length.wig-length"
    >;
    wig_construction: RelationAttribute<
      "product.wig-details",
      "oneToOne",
      "api::wig-construction.wig-construction"
    >;
    wig_crown: RelationAttribute<
      "product.wig-details",
      "oneToOne",
      "api::wig-crown.wig-crown"
    >;
    wig_top: RelationAttribute<
      "product.wig-details",
      "oneToOne",
      "api::wig-top.wig-top"
    >;
    wig_type: RelationAttribute<
      "product.wig-details",
      "oneToOne",
      "api::wig-type.wig-type"
    >;
    wig_material: RelationAttribute<
      "product.wig-details",
      "oneToOne",
      "api::wig-material.wig-material"
    >;
    wig_style: RelationAttribute<
      "product.wig-details",
      "oneToOne",
      "api::wig-style.wig-style"
    >;
  };
}

export interface SharedMetaSocial extends ComponentSchema {
  info: {
    displayName: "metaSocial";
    icon: "project-diagram";
  };
  attributes: {
    socialNetwork: EnumerationAttribute<["Facebook", "Twitter"]> &
      RequiredAttribute;
    title: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: MediaAttribute;
  };
}

export interface SharedSeo extends ComponentSchema {
  info: {
    displayName: "seo";
    icon: "search";
  };
  attributes: {
    metaTitle: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: MediaAttribute & RequiredAttribute;
    metaSocial: ComponentAttribute<"shared.meta-social", true>;
    keywords: TextAttribute;
    metaRobots: StringAttribute;
    structuredData: JSONAttribute;
    metaViewport: StringAttribute;
    canonicalURL: StringAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      "admin::permission": AdminPermission;
      "admin::user": AdminUser;
      "admin::role": AdminRole;
      "admin::api-token": AdminApiToken;
      "plugin::upload.file": PluginUploadFile;
      "plugin::upload.folder": PluginUploadFolder;
      "plugin::awesome-help.help": PluginAwesomeHelpHelp;
      "plugin::i18n.locale": PluginI18NLocale;
      "plugin::users-permissions.permission": PluginUsersPermissionsPermission;
      "plugin::users-permissions.role": PluginUsersPermissionsRole;
      "plugin::users-permissions.user": PluginUsersPermissionsUser;
      "plugin::custom-links.custom-link": PluginCustomLinksCustomLink;
      "plugin::custom-links.tempuri": PluginCustomLinksTempuri;
      "api::category.category": ApiCategoryCategory;
      "api::color.color": ApiColorColor;
      "api::instagram-hashtag.instagram-hashtag": ApiInstagramHashtagInstagramHashtag;
      "api::order.order": ApiOrderOrder;
      "api::product.product": ApiProductProduct;
      "api::province.province": ApiProvinceProvince;
      "api::tag.tag": ApiTagTag;
      "api::wig-construction.wig-construction": ApiWigConstructionWigConstruction;
      "api::wig-crown.wig-crown": ApiWigCrownWigCrown;
      "api::wig-length.wig-length": ApiWigLengthWigLength;
      "api::wig-material.wig-material": ApiWigMaterialWigMaterial;
      "api::wig-style.wig-style": ApiWigStyleWigStyle;
      "api::wig-top.wig-top": ApiWigTopWigTop;
      "api::wig-type.wig-type": ApiWigTypeWigType;
      "buyer.address": BuyerAddress;
      "product.details-list": ProductDetailsList;
      "product.details": ProductDetails;
      "product.wig-details": ProductWigDetails;
      "shared.meta-social": SharedMetaSocial;
      "shared.seo": SharedSeo;
    }
  }
}
