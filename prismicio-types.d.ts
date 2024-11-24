// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client';

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type HomepageDocumentDataSlicesSlice =
   | PaymentSectionSlice
   | TotalSectionSlice
   | TourSectionSlice
   | StaySectionSlice
   | FlightSectionSlice
   | VideoSectionSlice
   | HowItWorkSlice
   | TopAuthorSlice
   | ExploreStaySlice
   | HeroSlice;

/**
 * Content for Homepage documents
 */
interface HomepageDocumentData {
   /**
    * Slice Zone field in *Homepage*
    *
    * - **Field Type**: Slice Zone
    * - **Placeholder**: *None*
    * - **API ID Path**: homepage.slices[]
    * - **Tab**: Main
    * - **Documentation**: https://prismic.io/docs/field#slices
    */
   slices: prismic.SliceZone<HomepageDocumentDataSlicesSlice> /**
    * Meta Title field in *Homepage*
    *
    * - **Field Type**: Text
    * - **Placeholder**: A title of the page used for social media and search engines
    * - **API ID Path**: homepage.meta_title
    * - **Tab**: SEO & Metadata
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */;
   meta_title: prismic.KeyTextField;

   /**
    * Meta Description field in *Homepage*
    *
    * - **Field Type**: Text
    * - **Placeholder**: A brief summary of the page
    * - **API ID Path**: homepage.meta_description
    * - **Tab**: SEO & Metadata
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   meta_description: prismic.KeyTextField;

   /**
    * Meta Image field in *Homepage*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: homepage.meta_image
    * - **Tab**: SEO & Metadata
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   meta_image: prismic.ImageField<never>;
}

/**
 * Homepage document from Prismic
 *
 * - **API ID**: `homepage`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomepageDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
   Simplify<HomepageDocumentData>,
   'homepage',
   Lang
>;

/**
 * Item in *Setting → Navigation*
 */
export interface SettinsDocumentDataNavigationItem {
   /**
    * Title field in *Setting → Navigation*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.navigation[].title
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   title: prismic.KeyTextField;

   /**
    * Link field in *Setting → Navigation*
    *
    * - **Field Type**: Link
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.navigation[].link
    * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
    */
   link: prismic.LinkField;

   /**
    * Icon field in *Setting → Navigation*
    *
    * - **Field Type**: Select
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.navigation[].icon
    * - **Documentation**: https://prismic.io/docs/field#select
    */
   icon: prismic.SelectField<'flight' | 'hotel' | 'tour' | 'car'>;

   /**
    * Description field in *Setting → Navigation*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.navigation[].description
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   description: prismic.KeyTextField;
}

/**
 * Item in *Setting → Host*
 */
export interface SettinsDocumentDataHostItem {
   /**
    * Label field in *Setting → Host*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.host[].label
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   label: prismic.KeyTextField;

   /**
    * Address field in *Setting → Host*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.host[].address
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   address: prismic.KeyTextField;

   /**
    * Active time field in *Setting → Host*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.host[].active_time
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   active_time: prismic.KeyTextField;

   /**
    * Mail field in *Setting → Host*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.host[].mail
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   mail: prismic.KeyTextField;
}

/**
 * Item in *Setting → Socials*
 */
export interface SettinsDocumentDataSocialsItem {
   /**
    * Icon field in *Setting → Socials*
    *
    * - **Field Type**: Select
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.socials[].icon
    * - **Documentation**: https://prismic.io/docs/field#select
    */
   icon: prismic.SelectField<'facebook' | 'instagram' | 'twitter' | 'youtube'>;

   /**
    * Link field in *Setting → Socials*
    *
    * - **Field Type**: Link
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.socials[].link
    * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
    */
   link: prismic.LinkField;
}

/**
 * Item in *Setting → Footers*
 */
export interface SettinsDocumentDataFootersItem {}

type SettinsDocumentDataSlicesSlice = never;

/**
 * Content for Setting documents
 */
interface SettinsDocumentData {
   /**
    * Logo field in *Setting*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.logo
    * - **Tab**: Main
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   logo: prismic.ImageField<never>;

   /**
    * Site name field in *Setting*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.site_name
    * - **Tab**: Main
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   site_name: prismic.KeyTextField;

   /**
    * Navigation field in *Setting*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.navigation[]
    * - **Tab**: Main
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   navigation: prismic.GroupField<Simplify<SettinsDocumentDataNavigationItem>>;

   /**
    * Host field in *Setting*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.host[]
    * - **Tab**: Main
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   host: prismic.GroupField<Simplify<SettinsDocumentDataHostItem>>;

   /**
    * Socials field in *Setting*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.socials[]
    * - **Tab**: Main
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   socials: prismic.GroupField<Simplify<SettinsDocumentDataSocialsItem>>;

   /**
    * Footers field in *Setting*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.footers[]
    * - **Tab**: Main
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   footers: prismic.GroupField<Simplify<SettinsDocumentDataFootersItem>>;

   /**
    * Slice Zone field in *Setting*
    *
    * - **Field Type**: Slice Zone
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.slices[]
    * - **Tab**: Main
    * - **Documentation**: https://prismic.io/docs/field#slices
    */
   slices: prismic.SliceZone<SettinsDocumentDataSlicesSlice> /**
    * Meta Title field in *Setting*
    *
    * - **Field Type**: Text
    * - **Placeholder**: A title of the page used for social media and search engines
    * - **API ID Path**: settins.meta_title
    * - **Tab**: SEO & Metadata
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */;
   meta_title: prismic.KeyTextField;

   /**
    * Meta Description field in *Setting*
    *
    * - **Field Type**: Text
    * - **Placeholder**: A brief summary of the page
    * - **API ID Path**: settins.meta_description
    * - **Tab**: SEO & Metadata
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   meta_description: prismic.KeyTextField;

   /**
    * Meta Image field in *Setting*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: settins.meta_image
    * - **Tab**: SEO & Metadata
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   meta_image: prismic.ImageField<never>;
}

/**
 * Setting document from Prismic
 *
 * - **API ID**: `settins`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettinsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<
   Simplify<SettinsDocumentData>,
   'settins',
   Lang
>;

export type AllDocumentTypes = HomepageDocument | SettinsDocument;

/**
 * Primary content in *ExploreStay → Default → Primary*
 */
export interface ExploreStaySliceDefaultPrimary {
   /**
    * Heading field in *ExploreStay → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: explore_stay.default.primary.heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   heading: prismic.RichTextField;

   /**
    * Body field in *ExploreStay → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: explore_stay.default.primary.body
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   body: prismic.RichTextField;
}

/**
 * Default variation for ExploreStay Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ExploreStaySliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<ExploreStaySliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *ExploreStay*
 */
type ExploreStaySliceVariation = ExploreStaySliceDefault;

/**
 * ExploreStay Shared Slice
 *
 * - **API ID**: `explore_stay`
 * - **Description**: ExploreStay
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type ExploreStaySlice = prismic.SharedSlice<'explore_stay', ExploreStaySliceVariation>;

/**
 * Primary content in *FlightSection → Default → Primary*
 */
export interface FlightSectionSliceDefaultPrimary {
   /**
    * Heading field in *FlightSection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: flight_section.default.primary.heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   heading: prismic.RichTextField;

   /**
    * Body field in *FlightSection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: flight_section.default.primary.body
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   body: prismic.RichTextField;
}

/**
 * Default variation for FlightSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type FlightSectionSliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<FlightSectionSliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *FlightSection*
 */
type FlightSectionSliceVariation = FlightSectionSliceDefault;

/**
 * FlightSection Shared Slice
 *
 * - **API ID**: `flight_section`
 * - **Description**: FlightSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type FlightSectionSlice = prismic.SharedSlice<'flight_section', FlightSectionSliceVariation>;

/**
 * Item in *Hero → Default → Primary → Benefits*
 */
export interface HeroSliceDefaultPrimaryBenefitsItem {
   /**
    * Name field in *Hero → Default → Primary → Benefits*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: hero.default.primary.benefits[].name
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   name: prismic.KeyTextField;
}

/**
 * Primary content in *Hero → Default → Primary*
 */
export interface HeroSliceDefaultPrimary {
   /**
    * Sub Heading field in *Hero → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: hero.default.primary.sub_heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   sub_heading: prismic.RichTextField;

   /**
    * Heading field in *Hero → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: hero.default.primary.heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   heading: prismic.RichTextField;

   /**
    * Benefits field in *Hero → Default → Primary*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: hero.default.primary.benefits[]
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   benefits: prismic.GroupField<Simplify<HeroSliceDefaultPrimaryBenefitsItem>>;

   /**
    * Button Text field in *Hero → Default → Primary*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: hero.default.primary.button_text
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   button_text: prismic.KeyTextField;

   /**
    * Button_Link field in *Hero → Default → Primary*
    *
    * - **Field Type**: Link
    * - **Placeholder**: *None*
    * - **API ID Path**: hero.default.primary.button_link
    * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
    */
   button_link: prismic.LinkField;

   /**
    * Video_Text field in *Hero → Default → Primary*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: hero.default.primary.video_text
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   video_text: prismic.KeyTextField;

   /**
    * Video_Link field in *Hero → Default → Primary*
    *
    * - **Field Type**: Link
    * - **Placeholder**: *None*
    * - **API ID Path**: hero.default.primary.video_link
    * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
    */
   video_link: prismic.LinkField;

   /**
    * Background field in *Hero → Default → Primary*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: hero.default.primary.background
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   background: prismic.ImageField<never>;
}

/**
 * Default variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<HeroSliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *Hero*
 */
type HeroSliceVariation = HeroSliceDefault;

/**
 * Hero Shared Slice
 *
 * - **API ID**: `hero`
 * - **Description**: Hero
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HeroSlice = prismic.SharedSlice<'hero', HeroSliceVariation>;

/**
 * Item in *HowItWork → Default → Primary → HowItWorks*
 */
export interface HowItWorkSliceDefaultPrimaryHowitworksItem {
   /**
    * Image_Light field in *HowItWork → Default → Primary → HowItWorks*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: how_it_work.default.primary.howitworks[].image_light
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   image_light: prismic.ImageField<never>;

   /**
    * Image_Dark field in *HowItWork → Default → Primary → HowItWorks*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: how_it_work.default.primary.howitworks[].image_dark
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   image_dark: prismic.ImageField<never>;

   /**
    * Title field in *HowItWork → Default → Primary → HowItWorks*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: how_it_work.default.primary.howitworks[].title
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   title: prismic.RichTextField;

   /**
    * Description field in *HowItWork → Default → Primary → HowItWorks*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: how_it_work.default.primary.howitworks[].description
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   description: prismic.RichTextField;
}

/**
 * Primary content in *HowItWork → Default → Primary*
 */
export interface HowItWorkSliceDefaultPrimary {
   /**
    * Heading field in *HowItWork → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: how_it_work.default.primary.heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   heading: prismic.RichTextField;

   /**
    * Body field in *HowItWork → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: how_it_work.default.primary.body
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   body: prismic.RichTextField;

   /**
    * HowItWorks field in *HowItWork → Default → Primary*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: how_it_work.default.primary.howitworks[]
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   howitworks: prismic.GroupField<Simplify<HowItWorkSliceDefaultPrimaryHowitworksItem>>;
}

/**
 * Default variation for HowItWork Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HowItWorkSliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<HowItWorkSliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *HowItWork*
 */
type HowItWorkSliceVariation = HowItWorkSliceDefault;

/**
 * HowItWork Shared Slice
 *
 * - **API ID**: `how_it_work`
 * - **Description**: HowItWork
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type HowItWorkSlice = prismic.SharedSlice<'how_it_work', HowItWorkSliceVariation>;

/**
 * Item in *PaymentSection → Default → Primary → Images*
 */
export interface PaymentSectionSliceDefaultPrimaryImagesItem {
   /**
    * Image field in *PaymentSection → Default → Primary → Images*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.images[].image
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   image: prismic.ImageField<never>;
}

/**
 * Item in *PaymentSection → Default → Primary → Benefits*
 */
export interface PaymentSectionSliceDefaultPrimaryBenefitsItem {
   /**
    * Text field in *PaymentSection → Default → Primary → Benefits*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.benefits[].text
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   text: prismic.KeyTextField;
}

/**
 * Item in *PaymentSection → Default → Primary → Payments*
 */
export interface PaymentSectionSliceDefaultPrimaryPaymentsItem {
   /**
    * Logo field in *PaymentSection → Default → Primary → Payments*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.payments[].logo
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   logo: prismic.ImageField<never>;

   /**
    * Title field in *PaymentSection → Default → Primary → Payments*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.payments[].title
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   title: prismic.KeyTextField;
}

/**
 * Primary content in *PaymentSection → Default → Primary*
 */
export interface PaymentSectionSliceDefaultPrimary {
   /**
    * Images field in *PaymentSection → Default → Primary*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.images[]
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   images: prismic.GroupField<Simplify<PaymentSectionSliceDefaultPrimaryImagesItem>>;

   /**
    * Video Link field in *PaymentSection → Default → Primary*
    *
    * - **Field Type**: Link
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.video_link
    * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
    */
   video_link: prismic.LinkField;

   /**
    * Tag field in *PaymentSection → Default → Primary*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.tag
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   tag: prismic.KeyTextField;

   /**
    * Heading field in *PaymentSection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   heading: prismic.RichTextField;

   /**
    * Title field in *PaymentSection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.title
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   title: prismic.RichTextField;

   /**
    * Benefits field in *PaymentSection → Default → Primary*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.benefits[]
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   benefits: prismic.GroupField<Simplify<PaymentSectionSliceDefaultPrimaryBenefitsItem>>;

   /**
    * Payment Label field in *PaymentSection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.payment_label
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   payment_label: prismic.RichTextField;

   /**
    * Payments field in *PaymentSection → Default → Primary*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: payment_section.default.primary.payments[]
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   payments: prismic.GroupField<Simplify<PaymentSectionSliceDefaultPrimaryPaymentsItem>>;
}

/**
 * Default variation for PaymentSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PaymentSectionSliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<PaymentSectionSliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *PaymentSection*
 */
type PaymentSectionSliceVariation = PaymentSectionSliceDefault;

/**
 * PaymentSection Shared Slice
 *
 * - **API ID**: `payment_section`
 * - **Description**: PaymentSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type PaymentSectionSlice = prismic.SharedSlice<
   'payment_section',
   PaymentSectionSliceVariation
>;

/**
 * Primary content in *StaySection → Default → Primary*
 */
export interface StaySectionSliceDefaultPrimary {
   /**
    * Heading field in *StaySection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: stay_section.default.primary.heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   heading: prismic.RichTextField;

   /**
    * Body field in *StaySection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: stay_section.default.primary.body
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   body: prismic.RichTextField;
}

/**
 * Default variation for StaySection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type StaySectionSliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<StaySectionSliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *StaySection*
 */
type StaySectionSliceVariation = StaySectionSliceDefault;

/**
 * StaySection Shared Slice
 *
 * - **API ID**: `stay_section`
 * - **Description**: StaySection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type StaySectionSlice = prismic.SharedSlice<'stay_section', StaySectionSliceVariation>;

/**
 * Primary content in *TopAuthor → Default → Primary*
 */
export interface TopAuthorSliceDefaultPrimary {
   /**
    * Heading field in *TopAuthor → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: top_author.default.primary.heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   heading: prismic.RichTextField;

   /**
    * Body field in *TopAuthor → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: top_author.default.primary.body
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   body: prismic.RichTextField;
}

/**
 * Default variation for TopAuthor Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TopAuthorSliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<TopAuthorSliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *TopAuthor*
 */
type TopAuthorSliceVariation = TopAuthorSliceDefault;

/**
 * TopAuthor Shared Slice
 *
 * - **API ID**: `top_author`
 * - **Description**: TopAuthor
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TopAuthorSlice = prismic.SharedSlice<'top_author', TopAuthorSliceVariation>;

/**
 * Item in *TotalSection → Default → Primary → Totals*
 */
export interface TotalSectionSliceDefaultPrimaryTotalsItem {
   /**
    * Title field in *TotalSection → Default → Primary → Totals*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: total_section.default.primary.totals[].title
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   title: prismic.RichTextField;

   /**
    * Description field in *TotalSection → Default → Primary → Totals*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: total_section.default.primary.totals[].description
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   description: prismic.RichTextField;
}

/**
 * Primary content in *TotalSection → Default → Primary*
 */
export interface TotalSectionSliceDefaultPrimary {
   /**
    * Background field in *TotalSection → Default → Primary*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: total_section.default.primary.background
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   background: prismic.ImageField<never>;

   /**
    * Totals field in *TotalSection → Default → Primary*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: total_section.default.primary.totals[]
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   totals: prismic.GroupField<Simplify<TotalSectionSliceDefaultPrimaryTotalsItem>>;
}

/**
 * Default variation for TotalSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TotalSectionSliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<TotalSectionSliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *TotalSection*
 */
type TotalSectionSliceVariation = TotalSectionSliceDefault;

/**
 * TotalSection Shared Slice
 *
 * - **API ID**: `total_section`
 * - **Description**: TotalSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TotalSectionSlice = prismic.SharedSlice<'total_section', TotalSectionSliceVariation>;

/**
 * Primary content in *TourSection → Default → Primary*
 */
export interface TourSectionSliceDefaultPrimary {
   /**
    * Heading field in *TourSection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: tour_section.default.primary.heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   heading: prismic.RichTextField;

   /**
    * Body field in *TourSection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: tour_section.default.primary.body
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   body: prismic.RichTextField;
}

/**
 * Default variation for TourSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TourSectionSliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<TourSectionSliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *TourSection*
 */
type TourSectionSliceVariation = TourSectionSliceDefault;

/**
 * TourSection Shared Slice
 *
 * - **API ID**: `tour_section`
 * - **Description**: TourSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type TourSectionSlice = prismic.SharedSlice<'tour_section', TourSectionSliceVariation>;

/**
 * Item in *VideoSection → Default → Primary → Videos*
 */
export interface VideoSectionSliceDefaultPrimaryVideosItem {
   /**
    * Title field in *VideoSection → Default → Primary → Videos*
    *
    * - **Field Type**: Text
    * - **Placeholder**: *None*
    * - **API ID Path**: video_section.default.primary.videos[].title
    * - **Documentation**: https://prismic.io/docs/field#key-text
    */
   title: prismic.KeyTextField;

   /**
    * Link field in *VideoSection → Default → Primary → Videos*
    *
    * - **Field Type**: Link
    * - **Placeholder**: *None*
    * - **API ID Path**: video_section.default.primary.videos[].link
    * - **Documentation**: https://prismic.io/docs/field#link-content-relationship
    */
   link: prismic.LinkField;

   /**
    * Thumbnail field in *VideoSection → Default → Primary → Videos*
    *
    * - **Field Type**: Image
    * - **Placeholder**: *None*
    * - **API ID Path**: video_section.default.primary.videos[].thumbnail
    * - **Documentation**: https://prismic.io/docs/field#image
    */
   thumbnail: prismic.ImageField<never>;
}

/**
 * Primary content in *VideoSection → Default → Primary*
 */
export interface VideoSectionSliceDefaultPrimary {
   /**
    * Heading field in *VideoSection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: video_section.default.primary.heading
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   heading: prismic.RichTextField;

   /**
    * Body field in *VideoSection → Default → Primary*
    *
    * - **Field Type**: Rich Text
    * - **Placeholder**: *None*
    * - **API ID Path**: video_section.default.primary.body
    * - **Documentation**: https://prismic.io/docs/field#rich-text-title
    */
   body: prismic.RichTextField;

   /**
    * Videos field in *VideoSection → Default → Primary*
    *
    * - **Field Type**: Group
    * - **Placeholder**: *None*
    * - **API ID Path**: video_section.default.primary.videos[]
    * - **Documentation**: https://prismic.io/docs/field#group
    */
   videos: prismic.GroupField<Simplify<VideoSectionSliceDefaultPrimaryVideosItem>>;
}

/**
 * Default variation for VideoSection Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type VideoSectionSliceDefault = prismic.SharedSliceVariation<
   'default',
   Simplify<VideoSectionSliceDefaultPrimary>,
   never
>;

/**
 * Slice variation for *VideoSection*
 */
type VideoSectionSliceVariation = VideoSectionSliceDefault;

/**
 * VideoSection Shared Slice
 *
 * - **API ID**: `video_section`
 * - **Description**: VideoSection
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type VideoSectionSlice = prismic.SharedSlice<'video_section', VideoSectionSliceVariation>;

declare module '@prismicio/client' {
   interface CreateClient {
      (
         repositoryNameOrEndpoint: string,
         options?: prismic.ClientConfig,
      ): prismic.Client<AllDocumentTypes>;
   }

   interface CreateWriteClient {
      (
         repositoryNameOrEndpoint: string,
         options: prismic.WriteClientConfig,
      ): prismic.WriteClient<AllDocumentTypes>;
   }

   interface CreateMigration {
      (): prismic.Migration<AllDocumentTypes>;
   }

   namespace Content {
      export type {
         HomepageDocument,
         HomepageDocumentData,
         HomepageDocumentDataSlicesSlice,
         SettinsDocument,
         SettinsDocumentData,
         SettinsDocumentDataNavigationItem,
         SettinsDocumentDataHostItem,
         SettinsDocumentDataSocialsItem,
         SettinsDocumentDataFootersItem,
         SettinsDocumentDataSlicesSlice,
         AllDocumentTypes,
         ExploreStaySlice,
         ExploreStaySliceDefaultPrimary,
         ExploreStaySliceVariation,
         ExploreStaySliceDefault,
         FlightSectionSlice,
         FlightSectionSliceDefaultPrimary,
         FlightSectionSliceVariation,
         FlightSectionSliceDefault,
         HeroSlice,
         HeroSliceDefaultPrimaryBenefitsItem,
         HeroSliceDefaultPrimary,
         HeroSliceVariation,
         HeroSliceDefault,
         HowItWorkSlice,
         HowItWorkSliceDefaultPrimaryHowitworksItem,
         HowItWorkSliceDefaultPrimary,
         HowItWorkSliceVariation,
         HowItWorkSliceDefault,
         PaymentSectionSlice,
         PaymentSectionSliceDefaultPrimaryImagesItem,
         PaymentSectionSliceDefaultPrimaryBenefitsItem,
         PaymentSectionSliceDefaultPrimaryPaymentsItem,
         PaymentSectionSliceDefaultPrimary,
         PaymentSectionSliceVariation,
         PaymentSectionSliceDefault,
         StaySectionSlice,
         StaySectionSliceDefaultPrimary,
         StaySectionSliceVariation,
         StaySectionSliceDefault,
         TopAuthorSlice,
         TopAuthorSliceDefaultPrimary,
         TopAuthorSliceVariation,
         TopAuthorSliceDefault,
         TotalSectionSlice,
         TotalSectionSliceDefaultPrimaryTotalsItem,
         TotalSectionSliceDefaultPrimary,
         TotalSectionSliceVariation,
         TotalSectionSliceDefault,
         TourSectionSlice,
         TourSectionSliceDefaultPrimary,
         TourSectionSliceVariation,
         TourSectionSliceDefault,
         VideoSectionSlice,
         VideoSectionSliceDefaultPrimaryVideosItem,
         VideoSectionSliceDefaultPrimary,
         VideoSectionSliceVariation,
         VideoSectionSliceDefault,
      };
   }
}
