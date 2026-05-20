import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    site: defineCollection({
      type: 'data',
      source: 'site/info.yml',
      schema: z.object({
        name: z.string(),
        tagline: z.string(),
        address: z.string(),
        phone: z.string(),
        hours: z.array(z.object({ day: z.string(), hours: z.string() })),
        social: z
          .object({ instagram: z.string().optional(), facebook: z.string().optional() })
          .optional(),
      }),
    }),

    home: defineCollection({
      type: 'data',
      source: 'pages/home.yml',
      schema: z.object({
        eyebrow: z.string(),
        title: z.string(),
        intro: z.string(),
        hero: z
          .object({ image: z.string().optional() })
          .optional(),
        signature: z.object({
          label: z.string(),
          name: z.string(),
          image: z.string().optional(),
        }),
        categories: z.array(
          z.object({
            slug: z.string(),
            label: z.string(),
            count: z.number(),
            image: z.string().optional(),
          })
        ),
        roots: z.object({
          eyebrow: z.string(),
          title: z.string(),
          quote: z.string(),
          body: z.string(),
          image: z.string().optional(),
          badges: z.array(z.object({ value: z.string(), label: z.string() })),
        }),
      }),
    }),

    story: defineCollection({
      type: 'data',
      source: 'pages/story.yml',
      schema: z.object({
        hero: z.object({
          eyebrow: z.string(),
          title: z.string(),
          body: z.string(),
          image: z.string().optional(),
          cta: z.object({ label: z.string(), href: z.string() }),
        }),
        bento: z.object({
          eyebrow: z.string(),
          quote: z.string(),
          quoteImage: z.string().optional(),
          whyTitle: z.string(),
          whyBody: z.string(),
          whyImage: z.string().optional(),
          freshTitle: z.string(),
          freshBody: z.string(),
          freshImage: z.string().optional(),
          bridgeTitle: z.string(),
          bridgeBody: z.string(),
          bridgeImage: z.string().optional(),
          gestureTitle: z.string(),
          gestureImage: z.string().optional(),
        }),
        pillars: z.array(
          z.object({
            title: z.string(),
            body: z.string(),
            image: z.string().optional(),
          })
        ),
      }),
    }),

    booking: defineCollection({
      type: 'data',
      source: 'pages/booking.yml',
      schema: z.object({
        title: z.string(),
        intro: z.string(),
        image: z.string().optional(),
        submitLabel: z.string(),
        partySizes: z.array(z.string()),
        info: z.object({
          name: z.string(),
          address: z.string(),
          phone: z.string(),
          mapImage: z.string().optional(),
          ambianceImage: z.string().optional(),
          hours: z.array(z.object({ day: z.string(), hours: z.string() })),
        }),
      }),
    }),

    menu: defineCollection({
      type: 'data',
      source: 'menu/*.yml',
      schema: z.object({
        slug: z.string(),
        title: z.string(),
        category: z.enum(['entrees', 'plats', 'desserts', 'boissons']),
        price: z.number(),
        description: z.string(),
        badges: z.array(z.string()).optional(),
        signature: z.boolean().optional(),
        order: z.number().optional(),
        image: z.string().optional(),
      }),
    }),

    categories: defineCollection({
      type: 'data',
      source: 'menu-categories.yml',
      schema: z.object({
        items: z.array(
          z.object({
            slug: z.string(),
            label: z.string(),
            description: z.string().optional(),
            order: z.number(),
          })
        ),
      }),
    }),
  },
})
