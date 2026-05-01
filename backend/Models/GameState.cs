using System.Collections.Generic;

namespace ShapeClickerApi.Models
{
    public class Building
    {
        public string Name { get; set; }
        public long Cost { get; set; }
        public long Production { get; set; }
        public int Count { get; set; }
    }

    public class Upgrade
    {
        public string Name { get; set; }
        public long Cost { get; set; }
        public UpgradeEffect Effect { get; set; }
        public bool Owned { get; set; }
    }

    public class UpgradeEffect
    {
        public string Type { get; set; } // "click" or "building"
        public int Multiplier { get; set; }
    }

    public class GameState
    {
        public long Shapes { get; set; }
        public long ShapesPerClick { get; set; }
        public long ShapesPerSecond { get; set; }
        public int PrestigeLevel { get; set; }
        public double PrestigeMultiplier { get; set; }
        public long PrestigeThreshold { get; set; }
        public List<Building> Buildings { get; set; }
        public List<Upgrade> Upgrades { get; set; }
    }
}