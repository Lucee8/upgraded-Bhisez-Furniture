export function getCsvSpecs(catSlug: string, subSlug: string, num: number): {
  woodTypePrices?: { Aakashi?: number; Shivan?: number; Sagwan?: number };
  availableSize?: string;
} {
  const woodTypePrices: { Aakashi?: number; Shivan?: number; Sagwan?: number } = {};
  let availableSize: string | undefined = undefined;

  // Door Frames
  if (catSlug === 'door-frames') {
    availableSize = "78x36";
    if (subSlug === 'set') {
      const prices: Record<number, number> = {
        1: 187000, 2: 172000, 3: 195000, 4: 62000, 5: 55000, 6: 60000, 7: 65000, 8: 85000, 9: 72000, 10: 65000,
        11: 72000, 12: 55000, 13: 58000, 14: 76000, 15: 65000, 16: 195000, 17: 58000, 18: 62000, 19: 68000, 20: 68000,
        21: 68000, 22: 68000, 23: 68000, 24: 65000, 25: 85000, 26: 65000, 27: 65000, 28: 65000, 29: 68000, 30: 55000,
        31: 68000, 32: 48000, 33: 135000
      };
      if (prices[num]) woodTypePrices.Sagwan = prices[num];
    } else if (subSlug === 'mandir-room') {
      const prices: Record<number, number> = {
        1: 108500, 2: 48000, 3: 58000, 4: 58000, 5: 48000, 6: 48000, 7: 48000, 8: 58000, 9: 38000, 10: 26000,
        11: 58000, 12: 26000, 13: 58000, 14: 45000, 15: 24000, 16: 58050
      };
      if (prices[num]) woodTypePrices.Sagwan = prices[num];
    } else if (subSlug === 'door') {
      const prices: Record<number, number> = {
        1: 26000, 2: 24000, 3: 26000, 4: 26500, 5: 25500, 6: 25000, 7: 34000, 8: 28000, 9: 32000, 10: 24000
      };
      if (prices[num]) woodTypePrices.Sagwan = prices[num];
    } else if (subSlug === 'christian-door') {
      const prices: Record<number, number> = { 1: 28000, 2: 26500 };
      if (prices[num]) woodTypePrices.Sagwan = prices[num];
    } else if (subSlug === 'frame') {
      if (num === 1) availableSize = "84x48";
      const prices: Record<number, number> = { 1: 38000, 2: 65000, 3: 44000 };
      if (prices[num]) woodTypePrices.Sagwan = prices[num];
    }
  }

  // Wooden Sofas
  if (catSlug === 'wooden-sofas' && subSlug === 'sofa') {
    if (num === 1) {
      woodTypePrices.Sagwan = 95000;
    } else if (num === 2 || num === 3) {
      woodTypePrices.Aakashi = 34000;
      woodTypePrices.Shivan = 42000;
      woodTypePrices.Sagwan = 48000;
    } else if (num === 4 || num === 5 || num === 8) {
      woodTypePrices.Shivan = 45500;
      woodTypePrices.Sagwan = 55000;
    } else if (num === 6) {
      woodTypePrices.Shivan = 44500;
      woodTypePrices.Sagwan = 52000;
    } else if (num === 7) {
      woodTypePrices.Shivan = 42000;
      woodTypePrices.Sagwan = 48000;
    } else if (num === 9) {
      woodTypePrices.Shivan = 95000;
      woodTypePrices.Sagwan = 135000;
    } else if (num === 10) {
      woodTypePrices.Shivan = 82000;
      woodTypePrices.Sagwan = 94000;
    } else if (num === 11 || num === 12) {
      woodTypePrices.Aakashi = 78100;
      woodTypePrices.Shivan = 86000;
      woodTypePrices.Sagwan = 104000;
    } else if (num === 13) {
      woodTypePrices.Shivan = 92000;
      woodTypePrices.Sagwan = 112000;
    } else if (num === 14) {
      woodTypePrices.Shivan = 36000;
      woodTypePrices.Sagwan = 42000;
    } else if (num === 15) {
      woodTypePrices.Shivan = 38000;
      woodTypePrices.Sagwan = 44500;
    }
  }

  // Beds
  if (catSlug === 'beds') {
    if (subSlug === 'premium-bed') {
      const shivan: Record<number, number> = { 1: 98000, 2: 107000, 3: 112000, 4: 106000 };
      const sagwan: Record<number, number> = { 1: 112000, 2: 128000, 3: 132000, 4: 128000 };
      if (shivan[num]) woodTypePrices.Shivan = shivan[num];
      if (sagwan[num]) woodTypePrices.Sagwan = sagwan[num];
    } else if (subSlug === 'open-bed') {
      if (num === 1 || num === 5) {
        woodTypePrices.Aakashi = 21500; woodTypePrices.Shivan = 27500; woodTypePrices.Sagwan = 38000;
      } else if (num === 2 || num === 4 || num === 7) {
        woodTypePrices.Aakashi = 22500; woodTypePrices.Shivan = 28500; woodTypePrices.Sagwan = 39000;
      } else if (num === 3 || num === 10) {
        woodTypePrices.Aakashi = 23500; woodTypePrices.Shivan = 30000; woodTypePrices.Sagwan = 42000;
      } else if (num === 6) {
        woodTypePrices.Aakashi = 20000; woodTypePrices.Shivan = 26000; woodTypePrices.Sagwan = 36000;
      } else if (num === 8) {
        woodTypePrices.Aakashi = 26000; woodTypePrices.Shivan = 35000; woodTypePrices.Sagwan = 39000;
      } else if (num === 9) {
        woodTypePrices.Aakashi = 28500; woodTypePrices.Shivan = 36000; woodTypePrices.Sagwan = 42000;
      } else if (num === 11) {
        woodTypePrices.Aakashi = 24000; woodTypePrices.Shivan = 34000; woodTypePrices.Sagwan = 44500;
      }
    } else if (subSlug === 'floating-bed') {
      woodTypePrices.Aakashi = 24000; woodTypePrices.Shivan = 28000; woodTypePrices.Sagwan = 34000;
    } else if (subSlug === 'box-bed') {
      if (num === 1 || num === 3) {
        woodTypePrices.Aakashi = 32000; woodTypePrices.Shivan = 48000; woodTypePrices.Sagwan = 56000;
      } else if (num === 2) {
        woodTypePrices.Aakashi = 34000; woodTypePrices.Shivan = 50000; woodTypePrices.Sagwan = 60000;
      } else if (num === 4) {
        woodTypePrices.Sagwan = 68000;
      }
    } else if (subSlug === 'trolley-bed') {
      const shivan: Record<number, number> = {
        1: 62000, 2: 62000, 3: 68000, 4: 62000, 5: 62000, 6: 68000, 7: 68000, 8: 60000, 9: 62000, 10: 62000,
        11: 68000, 12: 62000, 13: 32000
      };
      const sagwan: Record<number, number> = {
        1: 78000, 2: 78000, 3: 82000, 4: 78000, 5: 78000, 6: 82000, 7: 82000, 8: 75000, 9: 78000, 10: 78000,
        11: 82000, 12: 78000, 13: 38000
      };
      const aakashi: Record<number, number> = {
        1: 48000, 2: 48000, 4: 48000, 5: 48000, 8: 47000, 9: 48000, 10: 48000, 12: 48000
      };

      if (aakashi[num]) woodTypePrices.Aakashi = aakashi[num];
      if (shivan[num]) woodTypePrices.Shivan = shivan[num];
      if (sagwan[num]) woodTypePrices.Sagwan = sagwan[num];
      if (num === 13) availableSize = "6x3";
    } else if (subSlug === 'poster-bed') {
      woodTypePrices.Sagwan = 110000;
    } else if (subSlug === 'bunk-bed') {
      woodTypePrices.Sagwan = 195000;
    } else if (subSlug === 'hydraulic-bed') {
      woodTypePrices.Sagwan = 82500;
    }
  }

  // Dressing Table
  if (catSlug === 'dressing-table' && subSlug === 'dt') {
    if (num === 1) {
      woodTypePrices.Shivan = 30000; woodTypePrices.Sagwan = 38000;
    } else if (num === 2 || num === 4) {
      woodTypePrices.Aakashi = 32000; woodTypePrices.Shivan = 38000; woodTypePrices.Sagwan = 44000;
    } else if (num === 3) {
      woodTypePrices.Aakashi = 38000; woodTypePrices.Shivan = 42500; woodTypePrices.Sagwan = 48500;
    } else if (num === 5) {
      woodTypePrices.Aakashi = 18500; woodTypePrices.Shivan = 26000; woodTypePrices.Sagwan = 32000;
    }
  }

  // Wooden Swings
  if (catSlug === 'wooden-swings' && subSlug === 'swing') {
    if (num === 1) {
      woodTypePrices.Aakashi = 15000; woodTypePrices.Shivan = 18000; woodTypePrices.Sagwan = 24000;
      availableSize = "27x48";
    } else if (num === 2) {
      woodTypePrices.Aakashi = 27000; woodTypePrices.Shivan = 32000; woodTypePrices.Sagwan = 42000;
    } else if (num === 3) {
      woodTypePrices.Aakashi = 18500; woodTypePrices.Shivan = 24500; woodTypePrices.Sagwan = 28500;
      availableSize = "27x48";
    } else if (num === 4) {
      woodTypePrices.Aakashi = 29000; woodTypePrices.Shivan = 36000; woodTypePrices.Sagwan = 42000;
    } else if (num === 5) {
      woodTypePrices.Aakashi = 8500; woodTypePrices.Shivan = 10500; woodTypePrices.Sagwan = 12500;
    } else if (num === 6) {
      woodTypePrices.Aakashi = 26000; woodTypePrices.Shivan = 32000; woodTypePrices.Sagwan = 38000;
    } else if (num === 7 || num === 8) {
      woodTypePrices.Aakashi = 29000; woodTypePrices.Shivan = 36000; woodTypePrices.Sagwan = 42000;
    }
  }

  // Wooden Mandirs
  if (catSlug === 'wooden-mandirs') {
    if (subSlug === 'mandir') {
      const sizes: Record<number, string> = {
        1: "48x24x18", 2: "48x21x21", 3: "36x30x24", 4: "18x13x11", 5: "50x22x22",
        6: "52x22x22", 7: "15x8x18", 8: "20x9x24", 10: "30x18x12"
      };
      if (sizes[num]) availableSize = sizes[num];

      const shivan: Record<number, number> = {
        1: 32000, 2: 36000, 3: 30000, 4: 18500, 5: 38000, 6: 30000, 7: 10000, 8: 18500,
        9: 16500, 10: 18500, 11: 26000, 12: 22500, 13: 18500, 14: 18500, 15: 34000,
        16: 12000, 17: 12000, 18: 12500, 19: 5500, 20: 9500, 21: 3000, 22: 7000,
        23: 13500, 24: 18000, 25: 12500, 26: 14500, 27: 38000, 28: 11500, 29: 14500,
        30: 18500, 31: 22000, 32: 16500, 33: 48000, 34: 38000, 35: 18500
      };
      const sagwan: Record<number, number> = {
        1: 42000, 2: 44000, 3: 38000, 4: 24500, 5: 48000, 6: 38000, 7: 12500, 8: 24500,
        9: 20000, 10: 24500, 11: 32000, 12: 28000, 13: 22500, 14: 22500, 15: 42500,
        16: 18000, 17: 16500, 18: 18500, 19: 7500, 20: 14500, 21: 3500, 22: 9500,
        23: 16500, 24: 25000, 25: 14500, 26: 18500, 27: 45000, 28: 14500, 29: 16500,
        30: 22500, 31: 28000, 32: 20500, 33: 62000, 34: 48000, 35: 22500
      };
      if (shivan[num]) woodTypePrices.Shivan = shivan[num];
      if (sagwan[num]) woodTypePrices.Sagwan = sagwan[num];
    } else if (subSlug === 'rajasans') {
      const shivan: Record<number, number> = {
        1: 46000, 2: 34000, 3: 48000, 4: 11500, 5: 18000, 6: 18500, 7: 28000, 8: 44000,
        9: 18500, 10: 14000, 11: 36000, 12: 28200, 13: 18500, 14: 18500
      };
      const sagwan: Record<number, number> = {
        1: 58000, 2: 42000, 3: 62000, 4: 14500, 5: 22500, 6: 24500, 7: 36000, 8: 56000,
        9: 22500, 10: 18500, 11: 42500, 12: 32000, 13: 22500, 14: 22500
      };
      if (shivan[num]) woodTypePrices.Shivan = shivan[num];
      if (sagwan[num]) woodTypePrices.Sagwan = sagwan[num];
    } else if (subSlug === 'pooja-mandir') {
      if (num === 8) woodTypePrices.Aakashi = 28000;
      else {
        const sagwan: Record<number, number> = {
          1: 52000, 2: 78000, 3: 82000, 4: 95000, 5: 82000, 6: 42000, 7: 104000, 9: 52000
        };
        if (sagwan[num]) woodTypePrices.Sagwan = sagwan[num];
      }
    }
  }

  // Sofa Cum Beds
  if (catSlug === 'sofa-cum-beds' && subSlug === 'sofa-cum-beds') {
    const sizes: Record<number, string> = {
      1: "5 x 6", 2: "6 x 6.5", 3: "5 x 6", 4: "6 x 6.5", 5: "5 x 6", 6: "5 x 6",
      7: "5 x 6", 8: "5 x 6", 9: "6 x 6"
    };
    if (sizes[num]) availableSize = sizes[num];

    if (num === 1 || num === 3 || num === 7 || num === 8) {
      woodTypePrices.Aakashi = 42000; woodTypePrices.Shivan = 52000; woodTypePrices.Sagwan = 62000;
    } else if (num === 2) {
      woodTypePrices.Aakashi = 48000; woodTypePrices.Shivan = 58000; woodTypePrices.Sagwan = 68000;
    } else if (num === 4) {
      woodTypePrices.Aakashi = 56000; woodTypePrices.Shivan = 66000; woodTypePrices.Sagwan = 76000;
    } else if (num === 5) {
      woodTypePrices.Aakashi = 48000; woodTypePrices.Shivan = 58000; woodTypePrices.Sagwan = 68000;
    } else if (num === 6) {
      woodTypePrices.Aakashi = 56000; woodTypePrices.Shivan = 66000; woodTypePrices.Sagwan = 76000;
    } else if (num === 9) {
      woodTypePrices.Aakashi = 28000; woodTypePrices.Shivan = 34000; woodTypePrices.Sagwan = 42000;
    }
  }

  // Chaurang
  if (catSlug === 'chaurang-and-paats' && subSlug === 'chaurang') {
    if (num === 1 || num === 2 || num === 5) {
      woodTypePrices.Shivan = 10500; woodTypePrices.Sagwan = 12500;
    } else if (num === 4) {
      woodTypePrices.Shivan = 8000; woodTypePrices.Sagwan = 9000;
    }
  }

  // Diwans
  if (catSlug === 'diwans') {
    if (subSlug === 'open-diwan') {
      woodTypePrices.Aakashi = 11000;
    } else if (subSlug === 'box-diwan') {
      woodTypePrices.Aakashi = 22500;
    } else if (subSlug === 'trolley-diwan') {
      woodTypePrices.Aakashi = 30000;
    }
  }

  return {
    woodTypePrices: Object.keys(woodTypePrices).length > 0 ? woodTypePrices : undefined,
    availableSize
  };
}
